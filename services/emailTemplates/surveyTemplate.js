const keys = require('../../config/keys');

module.exports = (survey) => {
  // ${keys.redirectDomain}/thanks
  // /thanks is set up in surveyRoutes.js
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>Could you provide feedback?</h3>
        <p>Please answer the following question</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/thanks">Yes</a>
        </div>
        <div>
        <a href="${keys.redirectDomain}/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
