const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');

const Song = require('../models/Song');
const ListeningHistory = require('../models/ListeningHistory');

// POST /api/songs/listen - Registrar escucha
router.post('/listen', authenticateToken, async (req, res) => {
  const { songId } = req.body;

  if (!songId) return res.status(400).json({ error: 'songId requerido' });

  try {
    await ListeningHistory.create({
      userId: req.user.id,
      songId,
      timestamp: new Date()
    });
    res.json({ message: 'Escucha registrada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar historial' });
  }
});

// GET /api/songs/recommendations - Obtener recomendaciones
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const topGenres = await ListeningHistory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $lookup: {
          from: 'songs',
          localField: 'songId',
          foreignField: '_id',
          as: 'song'
        }
      },
      { $unwind: '$song' },
      { $group: { _id: '$song.genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 2 }
    ]);

    const genreNames = topGenres.map(g => g._id);

    const recommendations = await Song.find({ genre: { $in: genreNames } }).limit(10);

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener recomendaciones' });
  }
});

module.exports = router;
