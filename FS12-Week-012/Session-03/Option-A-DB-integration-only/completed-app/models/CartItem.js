// CartItem Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Quantity must be at least 1'
      },
      max: {
        args: [99],
        msg: 'Quantity cannot exceed 99'
      }
    }
  }
}, {
  tableName: 'cart_items'
});

module.exports = CartItem;
