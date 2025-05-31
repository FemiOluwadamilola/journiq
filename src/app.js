const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
require('./config/googleOAuthConfig');

dotenv.config();
const app = express();

// DB connect
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET]
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);


module.exports = app;
