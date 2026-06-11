// TODO: Import Sequelize and dotenv
const { Sequelize } = require("sequelize");
require("dotenv").config();

// TODO: Create a new Sequelize instance
// - Use environment variables for DB_NAME, DB_USER, DB_PASSWORD
// - Set host to DB_HOST (default: "localhost")
// - Set dialect to "postgres"
// - Set logging to false

const sequelize = new Sequelize(
  process.env.DB_NAME || "playlist_app",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  },
);


// TODO: Export the sequelize instance
module.exports = sequelize;