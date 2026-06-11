// Database Connection
// This file is complete - no changes needed
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connects to PostgreSQL using values from the .env file
// Defaults are provided in case any variable is missing
const sequelize = new Sequelize(
  process.env.DB_NAME || 'auth_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

// Test the connection when the app starts
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL successfully!');
  })
  .catch((error) => {
    console.error('PostgreSQL connection error:', error.message);
    console.error('Make sure PostgreSQL is running and your .env values are correct');
  });

module.exports = sequelize;
