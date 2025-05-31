const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.readonly']
}, async (accessToken, refreshToken, profile, done) => {
  // Save user or find existing one
  const user = await User.findOneAndUpdate(
    { googleId: profile.id },
    { googleId: profile.id, name: profile.displayName, accessToken },
    { upsert: true, new: true }
  );
  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
