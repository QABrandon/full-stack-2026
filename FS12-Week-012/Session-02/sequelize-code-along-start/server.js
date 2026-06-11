const express = require("express");
const { sequelize, User, Playlist, Song } = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());

// ==================== USER ROUTES ====================

// TODO: GET /api/users — get all users
//   - Use User.findAll()
//   - Return the array as JSON


// TODO: POST /api/users — create a user
//   - Use User.create(req.body)
//   - Return 201 status with the new user
//   - Return 400 status on validation error


// ==================== PLAYLIST ROUTES ====================

// TODO: GET /api/playlists — get all playlists with user and songs
//   - Use Playlist.findAll() with include:
//     - User model (attributes: ["id", "username"])
//     - Song model
//   - Order by createdAt DESC


// TODO: POST /api/playlists — create a playlist
//   - Use Playlist.create(req.body)
//   - req.body should have: name, genre, userId
//   - Return 201 status


// TODO: GET /api/playlists/:id — get one playlist with user and songs
//   - Use Playlist.findByPk(req.params.id) with same includes as above
//   - Return 404 if not found


// ==================== SONG ROUTES ====================

// TODO: POST /api/playlists/:id/songs — add a song to a playlist
//   - First find the playlist with Playlist.findByPk(req.params.id)
//   - Return 404 if playlist not found
//   - Create song with: title, artist, duration (from req.body), playlistId (from playlist)
//   - Return 201 status


// ==================== START SERVER ====================

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
