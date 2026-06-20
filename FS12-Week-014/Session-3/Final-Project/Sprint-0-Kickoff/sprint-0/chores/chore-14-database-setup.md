# Chore 14: Set Up Database and Test Connection

**Estimated Time:** 20-30 minutes

## Task

Create database instance, configure environment variables, and verify connection

## For Supabase (managed PostgreSQL)

> Reference: https://supabase.com/docs/guides/database/connecting-to-postgres

- [ ] Sign up for Supabase (https://supabase.com/)
- [ ] Create a new organization (if needed)
- [ ] Create a new project (free tier)
- [ ] Name the project after your app
- [ ] Create and save (somewhere else) a strong **database password** (you'll need it for the connection string)
- [ ] Under security - uncheck "Enable Data API" as we won't be using it for this course
- [ ] Wait for the project to finish provisioning (should see status of "Healthy")
- [ ] Click the **Connect** button in the top bar (or go to Project Settings → Database) to view connection strings
- [ ] Direct connection for your .env file is ideal but causes issues so we will use the Transaction Pooler Url (this is the one that works in Beekeeper Studio) - Note if you lose your password, visit the Dashboard > Project > Database > Settings > Database Password > Reset password (button)
  ```
  postgresql://postgres.ifogwfsfyplkifffzkfc:[YOUR-PASSWORD]@aws-1-us-west-2.pooler.supabase.com:6543/postgres
  ```
- [ ] Replace the password section with the access password you made previously (i.e. password is 123456 - but please use a more secure password)
  ```
  postgresql://postgres.ifogwfsfyplkifffzkfc:123456@aws-1-us-west-2.pooler.supabase.com:6543/postgres
  ```
- [ ]Check your connection string works in Beekeeper Studio (Transaction Pooler string needed) or your Postgres GUI of choice. New connection > Import from URL. Save the connection with a name (i.e generic-app-db) and check Save Password if you don't want to have to enter the password each time.
- [ ] Update `.env` with the actual connection string (replace `<password>` with the password you set):
  ```
  DATABASE_URL=postgresql://postgres.ifogwfsfyplkifffzkfc:123456@aws-1-us-west-2.pooler.supabase.com:6543/postgres
  ```
- [ ] Generate strong JWT secret (random string, 32+ characters) - https://bitwarden.com/password-generator/#password-generator
- [ ] Update `.env` with JWT secret:
  ```
  JWT_SECRET=your_actual_random_secret_here
  ```
- [ ] Install Sequelize and the Postgres driver:
  - Navigate to server folder in terminal
  - ls to check you have the package.json
  - Then run this command in the terminal `npm install sequelize pg pg-hstore`
- [ ] Create `config/db.js`:

  ```javascript
  const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });

  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Supabase Postgres connected successfully");
    } catch (error) {
      console.error("Database connection error:", error.message);
      process.exit(1);
    }
  };

  module.exports = { connectDB, sequelize };
  ```

- [ ] Update `server.js` to connect to the database:

  ```javascript
  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  const { connectDB } = require("./config/db");

  const app = express();

  // Connect to database
  connectDB();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Test route
  app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```

- [ ] Test database connection: `npm run dev`
- [ ] Verify console shows "Supabase Postgres connected successfully"
- [ ] Stop the dev server (Ctrl+C)
- [ ] Double check your security setup on supabase.com - Dashboard > Project > Database > Security Advisor and fix all critical errors listed before proceeding

## (Skip if Using Supabase) For PostgreSQL/MySQL Locally 

- [ ] Install PostgreSQL or MySQL locally
- [ ] Create new database
- [ ] Note username, password, database name
- [ ] Update `.env` with connection string
- [ ] Create config/db.js with Sequelize connection
  - see https://sequelize.org/docs/v6/getting-started/
- [ ] Update server.js to connect to database
- [ ] Test database connection

## Commit to GitHub

- [ ] Navigate to project root
- [ ] Stage all files: `git add .`
- [ ] Check status: `git status` (verify .env is NOT staged)
- [ ] Commit: `git commit -m "Initial project setup with client and server structure"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify commit appears on GitHub

## Acceptance Criteria

- [ ] Database instance created (Supabase or local Postgres/MySQL)
- [ ] .env file updated with actual DATABASE_URL
- [ ] .env file updated with strong JWT_SECRET (32+ characters)
- [ ] config/db.js created with connection logic
- [ ] server.js updated to connect to database
- [ ] Server starts successfully and connects to database
- [ ] Console shows successful connection message
- [ ] All files committed (except .env)
- [ ] .env is NOT in Git
- [ ] Commit pushed to GitHub
