const sequelize = require("../config/database");
const User = require("./User");
const Playlist = require("./Playlist");
const Song = require("./Song");

// ===== RELATIONSHIPS =====

// A User has many Playlists
User.hasMany(Playlist, { foreignKey: "userId", onDelete: "CASCADE" });
Playlist.belongsTo(User, { foreignKey: "userId" });

// A Playlist has many Songs
Playlist.hasMany(Song, { foreignKey: "playlistId", onDelete: "CASCADE" });
Song.belongsTo(Playlist, { foreignKey: "playlistId" });

module.exports = { sequelize, User, Playlist, Song };
