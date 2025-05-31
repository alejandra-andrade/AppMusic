const mongoose = require('mongoose');

const listeningHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ListeningHistory', listeningHistorySchema);
