# Completed App

The finished solution for the Sequelize authentication practice.

## Run It

Make sure PostgreSQL is running and `auth_db` exists (see the parent README).

```bash
cp .env.example .env
npm install
npm start
```

## Endpoints

- `POST /signup` - Create a new user
- `POST /login` - Log in with an existing user
- `GET  /users` - View all users (development only)

## How It Works

1. **Sequelize + PostgreSQL** - Data is saved to the `auth_db` database and persists across restarts
2. **User Model** - Defines `username` (unique) and `hashedPassword` columns
3. **Signup** - Hashes the password with bcrypt, then saves the user
4. **Login** - Looks up the user, then compares passwords with bcrypt
5. **Password Security** - Only the bcrypt hash is ever stored in the database
