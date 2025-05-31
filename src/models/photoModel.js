const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileId: String,
  name: String,
  mimeType: String,
  createdTime: Date,
  thumbnailLink: String,
  webViewLink: String,
},{timestamps: true});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
