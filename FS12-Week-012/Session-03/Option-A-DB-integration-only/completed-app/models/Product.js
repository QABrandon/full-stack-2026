// Product Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [3, 100],
        msg: 'Product name must be between 3 and 100 characters'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [10],
        msg: 'Description must be at least 10 characters'
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Price cannot be negative'
      }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['Electronics', 'Clothing', 'Books', 'Home', 'Sports']],
        msg: 'Category must be Electronics, Clothing, Books, Home, or Sports'
      }
    }
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'products'
});

module.exports = Product;
