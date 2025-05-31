const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  accessToken: String,
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
