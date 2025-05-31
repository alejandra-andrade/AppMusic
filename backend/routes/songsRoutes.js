const express = require('express');
const router  = express.Router();
const Song    = require('../models/Song');

// 1. Listar todas las canciones
// GET /api/songs
router.get('/', async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 });
  res.json(songs);
});

// 2. Canciones por género
// GET /api/songs/genre/:genre
router.get('/genre/:genre', async (req, res) => {
  const { genre } = req.params;
  const songs = await Song.find({ genre });
  res.json(songs);
});

// 3. Listado de géneros disponibles
// GET /api/songs/genres
router.get('/genres', async (req, res) => {
  const genres = await Song.distinct('genre');
  res.json(genres);
});

// 4. Top 10 éxitos (más populares)
// GET /api/songs/top
router.get('/top', async (req, res) => {
  const songs = await Song.find().sort({ popularity: -1 }).limit(10);
  res.json(songs);
});

// 5. Recomendaciones básicas (aleatorias)
// GET /api/songs/recommendations
router.get('/recommendations', async (req, res) => {
  const songs = await Song.aggregate([{ $sample: { size: 10 } }]);
  res.json(songs);
});

module.exports = router;
