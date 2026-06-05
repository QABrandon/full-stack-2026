const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// TODO: Define the User model with sequelize.define("User", { ... })
//
// Fields:
//   username:
//     - type: STRING(20)
//     - allowNull: false
//     - unique: true
//     - validate: len [3, 20] with message "Username must be between 3 and 20 characters"
//
//   email:
//     - type: STRING
//     - allowNull: false
//     - unique: true
//     - validate: isEmail with message "Must be a valid email address"
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

// TODO: Export the User model
module.exports = User;
