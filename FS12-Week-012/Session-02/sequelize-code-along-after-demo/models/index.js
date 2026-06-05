const sequelize = require("../config/database");
const User = require("./User");
const Playlist = require("./Playlist");
const Song = require("./Song");

// ===== RELATIONSHIPS =====

// TODO: A User has many Playlists (foreignKey: "userId", onDelete: "CASCADE")
// TODO: A Playlist belongs to a User (foreignKey: "userId")

// TODO: A Playlist has many Songs (foreignKey: "playlistId", onDelete: "CASCADE")
// TODO: A Song belongs to a Playlist (foreignKey: "playlistId")

module.exports = { sequelize, User};
