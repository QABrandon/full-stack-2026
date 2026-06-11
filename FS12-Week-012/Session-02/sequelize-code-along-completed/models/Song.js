const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Song = sequelize.define("Song", {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Song title cannot be empty",
      },
    },
  },
  artist: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Artist name cannot be empty",
      },
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    validate: {
      min: {
        args: [1],
        msg: "Duration must be at least 1 second",
      },
    },
  },
});

module.exports = Song;
