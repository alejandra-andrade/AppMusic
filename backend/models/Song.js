const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  artist:     { type: String, required: true },
  genre:      { type: String, required: true },
  url:        { type: String, required: true },   // Ruta al archivo o URL pública
  cover:      { type: String },                   // Portada
  popularity: { type: Number, default: 0 },       // Para top éxitos
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
