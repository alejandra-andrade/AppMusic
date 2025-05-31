const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

dotenv.config();
require('./config/passport');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: ["key1"],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/auth', require('./routes/socialAuthRoutes'));
const songsRoutes = require('./routes/songsRoutes');
app.use('/api/songs', require('./routes/songsRoutes'));
// tras app.use(express.json());
app.use('/api/songs', require('./routes/songsRoutes'));
const playlistRoutes = require('./routes/playlists');
app.use('/api/playlists', playlistRoutes);


// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
  })
  .catch(err => console.log(err));
