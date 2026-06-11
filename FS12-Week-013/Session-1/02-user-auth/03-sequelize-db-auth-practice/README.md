# Sequelize Database Authentication Practice

This practice demonstrates user authentication with Sequelize, PostgreSQL, and bcrypt. User data is stored in a PostgreSQL database and persists across server restarts.

## Folder Structure

- **starter-app/** - The starting point with TODO comments guiding what to build
- **completed-app/** - The finished solution for reference

## What You Will Build

A simple Express server with three endpoints:
- `POST /signup` - Create a new user with a hashed password
- `POST /login` - Verify a user's credentials
- `GET /users` - List all users (development only)

## Prerequisites

Make sure PostgreSQL is installed and running:

```bash
# Check if PostgreSQL is running (macOS)
brew services list

# Start PostgreSQL if needed (macOS)
brew services start postgresql@16
```

Create the database (once):

```bash
createdb auth_db
```

## How to Run

1. Move into the folder you want to run:
```bash
cd starter-app
# or
cd completed-app
```

2. Copy the environment file and update values if needed:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

The `Users` table will be created automatically on first run.

## Testing the Endpoints

### Signup
```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "securePassword123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "securePassword123"}'
```

### View All Users
```bash
curl http://localhost:3000/users
```

## Practice Steps

Open `starter-app/` and complete the TODOs in order:
1. Finish the `User` model in `models/User.js`
2. Complete the signup route in `server.js`
3. Complete the login route in `server.js`
4. Test each endpoint with curl or Postman

Compare your work to `completed-app/` when you get stuck.

## Running the Postman Collection

`Auth-API.postman_collection.json` lives in each app folder. You can use it two ways:

**Option 1 - Import into Postman:**
1. Open Postman and click Import
2. Select `Auth-API.postman_collection.json`
3. Start the server (`npm start`) and run the requests top to bottom

**Option 2 - Run from the terminal with Newman:**

With the server running in one terminal, run this in another:

```bash
npm test
```

The collection tests signup success, missing fields, duplicate usernames, login success, wrong password, unknown user, and the users list endpoint.

## Common Problems and Solutions

### Problem: Connection Refused Error
```
PostgreSQL connection error: connect ECONNREFUSED 127.0.0.1:5432
```

**What this means:** PostgreSQL is not running.

**How to fix:**
1. Check if PostgreSQL is running: `brew services list` (macOS)
2. Start PostgreSQL: `brew services start postgresql@16` (macOS)

### Problem: Database Does Not Exist
```
database "auth_db" does not exist
```

**How to fix:** Run `createdb auth_db` from the terminal.

### Problem: Password Authentication Failed
```
password authentication failed for user "postgres"
```

**How to fix:** Update `DB_USER` and `DB_PASSWORD` in your `.env` file to match your PostgreSQL setup.
