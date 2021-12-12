const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is not coming from profile.id/googleId. It comes from mongoDB record _id!
  // we use that id in case we are going to use different auth i.e. fb auth etc.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id,
      }).then((existingUser) => {
        if (existingUser) {
          // We already have a record whit the given profile id
          done(null, existingUser);
        } else {
          // We don't have a user record with this ID, make a new record!
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
