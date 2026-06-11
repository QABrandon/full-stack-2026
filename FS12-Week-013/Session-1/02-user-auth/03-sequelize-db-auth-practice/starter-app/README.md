# Starter App

Complete the TODOs to build a working authentication API.

## Your Tasks

**In `models/User.js`:**
- TODO 1: Define the `username` and `hashedPassword` fields

**In `server.js`:**
- TODO 2: Hash the password with bcrypt in signup
- TODO 3: Create the new user in the database
- TODO 4: Send the signup success response
- TODO 5: Find the user by username in login
- TODO 6: Handle the case where no user exists
- TODO 7: Compare the provided password to the stored hash
- TODO 8: Handle the case where the password doesn't match
- TODO 9: Send the login success response

## Run It

Make sure PostgreSQL is running and `auth_db` exists (see the parent README).

```bash
cp .env.example .env
npm install
npm start
```
