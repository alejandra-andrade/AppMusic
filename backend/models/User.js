const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  provider: { type: String, default: 'local' },
  premium: { type: Boolean, default: false },
  socialId: String
});

module.exports = mongoose.model('User', userSchema);
