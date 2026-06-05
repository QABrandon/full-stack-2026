# Supabase Cloud Setup: Connect PostgreSQL to Your Project

## What is Supabase?

Supabase gives you a **free cloud PostgreSQL database** — no local install needed. It's like MongoDB Atlas but for SQL.

- Free tier: 2 projects, 500MB database, unlimited API requests
- You get a real PostgreSQL database hosted in the cloud
- Works with Sequelize exactly the same as local PostgreSQL

---

## Step 1: Create a Supabase Account

1. Go to https://supabase.com
2. Click **Start your project** (or **Sign Up**)
3. Sign in with **GitHub** (easiest) or email

---

## Step 2: Create a New Project

1. Click **New Project**
2. Pick your organization (or create one)
3. Fill in:
   - **Name:** `shopping-cart` (or whatever you want — name it after your app)
   - **Database Password:** pick a **strong** password and **SAVE IT somewhere safe — you'll need this for the connection string**
   - **Region:** pick the closest to you
   - **Uncheck "Enable Data API"** — we won't be using Supabase's auto-generated REST API for this course. ⚠️ If you leave this on, your `public` schema is exposed through a public API that **anyone on the internet can query** — so turn it off.
4. Click **Create new project**
5. Wait for the project to finish provisioning — it should show a status of **"Healthy"** (~2 minutes)

> **Lost your password?** Reset it at Dashboard → Project → Database → Settings → **Database Password** → **Reset password**.

---

## Step 3: Get Your Connection String

1. Click the **Connect** button in the top bar (or go to **Project Settings → Database**)
2. Find the **Connection string** section
3. **Use the Transaction Pooler URL** — the direct connection is ideal in theory but causes issues, and the Transaction Pooler string is the one that also works in Beekeeper Studio. It uses port **6543** and looks like:

```
postgresql://postgres.ifogwfsfyplkifffzkfc:[YOUR-PASSWORD]@aws-1-us-west-2.pooler.supabase.com:6543/postgres
```

4. Replace `[YOUR-PASSWORD]` with the password you set in Step 2. For example, if your password were `123456` (use a more secure one!):

```
postgresql://postgres.ifogwfsfyplkifffzkfc:123456@aws-1-us-west-2.pooler.supabase.com:6543/postgres
```

> Your `project-ref` and region will differ — copy the exact string from your own dashboard.

---

## Step 4: Update Your .env File

Add the Supabase **Transaction Pooler** connection string (with `[YOUR-PASSWORD]` replaced) to your `.env`:

```env
DATABASE_URL=postgresql://postgres.ifogwfsfyplkifffzkfc:123456@aws-1-us-west-2.pooler.supabase.com:6543/postgres
```

While you're here, also add a strong **JWT secret** (random string, 32+ characters — generate one at https://bitwarden.com/password-generator/):

```env
JWT_SECRET=your_actual_random_secret_here
```

> **Never commit `.env` to Git** — make sure it's listed in your `.gitignore`.

---

## Step 5: Install Sequelize and the Postgres Driver

1. Navigate to your **server** folder in the terminal
2. Run `ls` to confirm you see `package.json`
3. Install the packages:

```bash
npm install sequelize pg pg-hstore
```

---

## Step 6: Create config/db.js

Create `config/db.js` with the Sequelize connection. Because we're using the Transaction Pooler URL, no extra SSL options are needed:

```javascript
// config/db.js
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

---

## Step 7: Connect from server.js

Call `connectDB()` when your server starts:

```javascript
// server.js
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

---

## Step 8: Test the Connection

```bash
npm run dev
```

You should see:

```
Supabase Postgres connected successfully
Server running on port 3001
```

Then stop the dev server with **Ctrl+C**.

---

## Step 9: Verify Your Security Setup

Before moving on, double-check your project's security:

1. Confirm the **Data API is disabled** (Step 2)
2. Go to Dashboard → Project → Database → **Security Advisor**
3. **Fix all critical errors** listed before proceeding

---

## Step 10: Connect Beekeeper Studio to Supabase (Optional)

You can also browse your cloud database visually. The easiest way is to import the **Transaction Pooler** URL directly:

1. Open Beekeeper Studio
2. **New connection → Import from URL**, then paste your Transaction Pooler connection string
3. Save the connection with a name (e.g. `generic-app-db`) and check **Save Password** if you don't want to re-enter it each time
4. **Test → Connect**

Or enter the fields manually (copy values from your dashboard):

| Field | Value |
|-------|-------|
| Type | PostgreSQL |
| Host | `aws-1-us-west-2.pooler.supabase.com` (from dashboard) |
| Port | `6543` |
| User | `postgres.[project-ref]` (from dashboard) |
| Password | your password |
| Database | `postgres` |
| **Enable SSL** | **Yes** |

---

## Switching Between Local and Cloud

Just change the `DATABASE_URL` in your `.env` file — your code doesn't change, only the environment variable:

```env
# CLOUD (Supabase Transaction Pooler) — use this for the project
DATABASE_URL=postgresql://postgres.[project-ref]:[pass]@aws-1-us-west-2.pooler.supabase.com:6543/postgres

# LOCAL — point at your local Postgres instead
# DATABASE_URL=postgresql://postgres:@localhost:5432/shopping_cart_db
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ECONNREFUSED` | Check your connection string — did you use the **Transaction Pooler** URL and replace `[YOUR-PASSWORD]`? |
| Connection hangs / times out | Make sure you're using the **Transaction Pooler** URL (port `6543`), not the direct connection |
| `password authentication failed` | Double-check the password in your string — reset it at Dashboard → Project → Database → Settings → **Database Password → Reset password** |
| Critical security warnings | Confirm **Data API is disabled** and fix everything in Dashboard → Database → **Security Advisor** |
| Slow queries | Make sure you picked a region close to you |
