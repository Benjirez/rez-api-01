const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  a: String,
  b: String,
  c: String,
  d: [],
  dateModified: { type: Date, default: Date.now},
  dateCreated: { type: Date, default: Date.now, immutable: true }
});


module.exports = mongoose.model('User', UserSchema);
