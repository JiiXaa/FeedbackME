// keys.js - figure out what set of credentials to return
// .NODE_ENV === 'production' is automatically created by HEROKU you can see it after pushing to heroku NODE_ENV=production and other configs
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the production set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the development keys
  module.exports = require('./dev');
}
