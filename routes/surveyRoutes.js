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
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const pathToTest = new Path('/api/surveys/:surveyId/:choice');

    // Using lodash map function because it does work better when the array we're trying to map is accidentally undefined.
    const sgEvents = _.map(req.body, ({ email, url }) => {
      // Extracting url value from SENDGRID webhook events object.
      const pathname = new URL(url).pathname;
      // path-parser create object with values we specified :surveyId and :choice and compares it with the pathname.
      // When user clicks on the survey email YES or NO it will extract surveyId and Choice and saves it {surveyId: someId, choice: yes/no}
      // If Path will not find :surveyId and :choice it will return null, that will help us discard record with wrong email events.
      const match = pathToTest.test(pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });
    // Lodash compact method removes all undefined elements
    const compactSGEvents = _.compact(sgEvents);
    const uniqueSGEvents = _.uniqBy(compactSGEvents, 'email', 'surveyId');
    // and returns only uniques

    console.log(uniqueSGEvents);

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
