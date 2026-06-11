// Database Connection Module
const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Cloud connection (Supabase)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Local connection
  sequelize = new Sequelize(
    process.env.DB_NAME || 'music_favorites_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false
    }
  );
}

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL successfully!');
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDatabase };
