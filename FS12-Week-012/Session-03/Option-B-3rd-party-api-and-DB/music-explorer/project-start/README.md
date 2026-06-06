# Music Explorer API

Search for music and save your favorite tracks to a PostgreSQL database.

## Setup

1. `npm install`
2. No API key needed — iTunes API requires no auth
3. Create database: `createdb music_favorites_db` (Mac) or `psql -U postgres -c "CREATE DATABASE music_favorites_db;"` (Windows)
4. Copy `.env.example` to `.env` and fill in your credentials
5. `npm start`

## Endpoints to Build

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/search?q=query | Search for tracks |
| POST | /api/favorites | Save a track to favorites |
| GET | /api/favorites | Get all saved favorites |
| DELETE | /api/favorites/:id | Remove a favorite |

## Project Structure
```
config/
  database.js     # Sequelize connection
  music.js      # music API auth + search (provided)
models/
  Favorite.js     # Favorite track model
routes/
  search.js       # Search endpoint
  favorites.js    # Favorites CRUD endpoints
server.js         # Express app setup
```
