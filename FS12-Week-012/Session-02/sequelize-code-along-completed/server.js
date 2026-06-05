const express = require("express");
const { sequelize, User, Playlist, Song } = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());

// ==================== USER ROUTES ====================

// GET /api/users — get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users — create a user
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==================== PLAYLIST ROUTES ====================

// GET /api/playlists — get all playlists with user and songs
app.get("/api/playlists", async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Song },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/playlists — create a playlist
app.post("/api/playlists", async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/playlists/:id — get one playlist with user and songs
app.get("/api/playlists/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Song },
      ],
    });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SONG ROUTES ====================

// POST /api/playlists/:id/songs — add a song to a playlist
app.post("/api/playlists/:id/songs", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      duration: req.body.duration,
      playlistId: playlist.id,
    });
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
