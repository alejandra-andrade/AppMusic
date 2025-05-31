const express = require('express');
const Playlist = require('../models/Playlist');
const auth = require('../middlewares/auth'); // tu middleware
const router = express.Router();

// Crear playlist (protegido)
router.post('/', auth, async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      isPublic,
      userId: req.user.id,
      songs: []
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear playlist' });
  }
});

// Obtener playlists del usuario
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id });
    res.json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener playlists' });
  }
});

module.exports = router;
