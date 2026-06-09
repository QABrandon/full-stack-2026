// User Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// TODO 1: Define the User model with two fields
//   - username: STRING, required (allowNull: false), must be unique
//   - hashedPassword: STRING, required (allowNull: false)
//
// Example syntax:
//   const User = sequelize.define('User', {
//     fieldName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });

const User = sequelize.define('User', {
  // Add your fields here

});

module.exports = User;
