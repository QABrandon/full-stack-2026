// User Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Name must be between 2 and 50 characters'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address'
      }
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    }
  },
  address: {
    type: DataTypes.STRING(200),
    defaultValue: ''
  }
}, {
  tableName: 'users'
});

module.exports = User;
