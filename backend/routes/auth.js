const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

// Registrar usuario
router.post('/register', async (req, res) => {
  const { name, email, password, premium } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      premium
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token });
  } catch (err) {
    console.error('Error en /register:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token });
  } catch (err) {
    console.error('Error en /login:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ✅ Obtener usuario autenticado (protege esta ruta con el middleware)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Error en /me:', err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
