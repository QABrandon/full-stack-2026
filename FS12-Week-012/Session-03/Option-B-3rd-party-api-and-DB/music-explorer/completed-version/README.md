# Music Explorer API - Sequelize Version

Search for music and save your favorite tracks to a PostgreSQL database.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Database
1. 
2. Create an app → copy Client ID and Client Secret

### 3. Set Up Database

**Local PostgreSQL:**
```bash
# Mac
createdb music_favorites_db

# Windows
psql -U postgres -c "CREATE DATABASE music_favorites_db;"
```

**Or Supabase Cloud:**
1. Go to https://supabase.com → create project
2. Copy connection string from Settings → Database

### 4. Create .env File
```
DB_NAME=music_favorites_db
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432


PORT=3000
```

For Supabase, use `DATABASE_URL` instead of individual settings.

### 5. Start Server
```bash
npm start
```

## API Endpoints

### Search for Tracks
```
GET /api/search?q=beatles
```
Response:
```json
{
  "query": "beatles",
  "count": 10,
  "tracks": [
    {
      "id": "3KfbEIOC7YIv90FIfNSZpo",
      "name": "Here Comes The Sun",
      "artist": "The Beatles",
      "album": "Abbey Road",
      "preview_url": "https://...",
      "image": "https://..."
    }
  ]
}
```

### Save a Favorite
```
POST /api/favorites
Body:
{
  "trackId": "3KfbEIOC7YIv90FIfNSZpo",
  "trackName": "Here Comes The Sun",
  "artistName": "The Beatles",
  "albumName": "Abbey Road",
  "previewUrl": "https://...",
  "imageUrl": "https://..."
}
```

### Get All Favorites
```
GET /api/favorites
```

### Get Single Favorite
```
GET /api/favorites/1
```

### Delete a Favorite
```
DELETE /api/favorites/1
```

## Project Structure
```
config/
  database.js     # Sequelize connection (local + Supabase)
  music.js      # music API auth + search
models/
  Favorite.js     # Favorite track model
routes/
  search.js       # Search endpoint
  favorites.js    # Favorites CRUD endpoints
server.js         # Express app setup
```

## Technologies
- Express.js
- Sequelize + PostgreSQL
- iTunes Search API (no auth required)
- dotenv, cors
