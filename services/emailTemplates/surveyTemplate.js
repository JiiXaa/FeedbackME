const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
  <html>
    <body>
    <div>
    <h3>Could you provide feedback?</h3>
    <p style="font-size: 20px">Please answer the following question</p>
    <p style="font-size: 16px">${survey.body}</p>
    <div style="display: flex;">
    <div>
    <a href="${keys.redirectDomain}/${survey.id}/yes" style="background-color: #1F7F4C; margin: 15px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 10px 16px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
    <!--[if mso]>
    <i style="letter-spacing: 15px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
    <![endif]-->
    <span style="mso-text-raise: 15pt;">YES</span>
    <!--[if mso]>
    <i style="letter-spacing: 15px; mso-font-width: -100%;">&nbsp;</i>
    <![endif]-->
    </a>
    </div>


    <div>
    <a href="${keys.redirectDomain}/${survey.id}/no" style="background-color: #EF6C57; margin: 15px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 10px 18px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
    <!--[if mso]>
    <i style="letter-spacing: 15px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
    <![endif]-->
    <span style="mso-text-raise: 15pt;">NO</span>
    <!--[if mso]>
    <i style="letter-spacing: 15px; mso-font-width: -100%;">&nbsp;</i>
    <![endif]-->
    </a>
    </div>
    </div>
    </div>

    </body>
  </html>
  `;
};
