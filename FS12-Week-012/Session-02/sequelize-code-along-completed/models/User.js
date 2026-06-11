const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 20],
        msg: "Username must be between 3 and 20 characters",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
});

module.exports = User;
