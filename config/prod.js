// prod.js - production keys here!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

// mongoURI_production:mongodb+srv://jiixaa:jiixaa100@cluster0.nljyw.mongodb.net/feedbackme-prod?retryWrites=true&w=majority
