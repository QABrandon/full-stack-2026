const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Playlist = sequelize.define("Playlist", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Playlist name cannot be empty",
      },
    },
  },
  genre: {
    type: DataTypes.STRING(50),
  },
});

module.exports = Playlist;
