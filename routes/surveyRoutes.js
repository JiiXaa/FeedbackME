const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find(
      { _user: req.user.id },
      // we use mongoose Projection to exclude recipients from the request
      { recipients: false }
    );

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/:surveyId/:choice');

    // used Lodash because it deals better with undefined values/no errors.
    const test = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        console.log('EMAIL -- ', email, surveyId, choice);
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      // sub-document schema, only need to specify 'email' because 'responded' is already defaulted to false
      // we need to convert string of email addresses to array of objects
      // wrapping {email} with parenthesis for interpreter to make sure he knows we want to return object with email inside. It could confuse it with function body
      // trim() for cutting out white space user could make
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      // user.id comes from mongoose so we dont need to create it.
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // This is where we send email using sendgrid
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // mailer sends emails
      await mailer.send();
      // save survey to our database
      await survey.save();
      // Deduct credit from the user after sending survey and save user.
      req.user.credits -= 1;
      // after saving req.user is stale so to speak, thats why we assign it to the user and that is user we use from now on.
      const user = await req.user.save();

      // send back updated user model, with updated credits. Same as when user pays us some money we update user, so our header update automatically with correct amount credits available. By sending user authReducer also catches it and update header.
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
