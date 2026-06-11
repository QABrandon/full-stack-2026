// Database Connection Module
// TODO: Import Sequelize from 'sequelize'
// TODO: Import dotenv and call .config()
//   IMPORTANT: dotenv MUST be loaded here (not just in server.js)
//   because this file reads env variables when it's first imported


// TODO: Create a Sequelize instance
// - If process.env.DATABASE_URL exists, use it (for Supabase cloud)
//   - Add dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
// - Otherwise, use individual env variables: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
//   - Set dialect to 'postgres'
//   - Set logging to false


// TODO: Create a connectDatabase async function that:
//   - Calls sequelize.authenticate()
//   - Logs "Connected to PostgreSQL successfully!"
//   - Catches errors and logs them
//   - Exits process on failure: process.exit(1)


// TODO: Export { sequelize, connectDatabase }
