const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(keys.sendGridKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: 'anythingfx@gmail.com',
      subject: subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true },
    };
  }

  async send() {
    const response = await sgMail.sendMultiple(this.msg);
    return response;
  }
}

module.exports = Mailer;

// // Mailer has capital letter because it exports a class.

// const sendgrid = require('sendgrid');
// const helper = sendgrid.mail;
// const keys = require('../config/keys');

// class Mailer extends helper.Mail {
//   // argument survey passed in constructor does not have to be tied to a survey model, it can be any object with a subject and recipients property.
//   constructor({ subject, recipients }, content) {
//     // content is a html string we get from the surveyTemplate(survey) in surveyRoutes.js
//     super();

//     this.from_email = new helper.Email('anythingfx@gmail.com');
//     this.subject = subject;
//     this.body = new helper.Content('text/html', content);
//     this.recipients = this.formatAddresses(recipients);

//     // we need to register body as a content to the mailer, assigning it to this.body is not enough
//     // addContent() method extends from a helper.Mail
//     this.addContent(this.body);

//     // Enabling click tracking inside of our email to use build in function in sendgrid API to find out who responded to our survey
//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     // every recipient is an object which comes from surveyRoutes.js
//     return recipients.map(({ email }) => {
//       // We use helper method from sendgrid API to format every email we get from map and return it.
//       return new helper.Email(email);
//     });
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();
//     this.recipients.forEach((recipient) => {
//       personalize.addTo(recipient);
//     });
//     this.addPersonalization(personalize);
//   }
// }

// module.exports = Mailer;
