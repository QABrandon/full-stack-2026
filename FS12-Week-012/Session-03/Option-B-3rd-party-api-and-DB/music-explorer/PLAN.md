# Music Explorer - Sequelize Project Plan

## Project Overview

Build a RESTful API that lets users search for music using a free third-party API and save their favorite tracks to a PostgreSQL database using Sequelize.

**What you'll build:**
- An Express API that connects to a music API (see options below)
- A PostgreSQL database (local or Supabase cloud) to store favorite tracks
- RESTful endpoints for searching and managing favorites

## Choose Your Music API

Pick **one** of these free APIs for your project. Each has trade-offs — read the table and choose what works best for you.

| API | Auth | Rate Limit | Search Returns | Previews? | Key Gotcha |
|-----|------|-----------|----------------|-----------|------------|
| **iTunes** | None (no key needed!) | ~20 req/min | Track, artist, album, artwork | 30s clips | Apple affiliate/branding requirements |
| **Jamendo** | `client_id` (free signup) | 35k req/month | Track, artist, album, artwork | Full tracks | Non-commercial use only |
| **MusicBrainz** | User-Agent header only | 1 req/sec | Track, artist, album metadata | No | No images in search (needs Cover Art Archive for artwork) |
| **Last.fm** | `api_key` (free signup) | "Reasonable use" | Track, artist, listeners | No | `track.search` doesn't return album name |
| **Genius** | Access Token (free signup) | Unspecified | Lyrics metadata, artist | No | Strictly non-commercial; lyrics-focused, not audio |

### Recommended for This Project

1. **iTunes** (easiest) — No API key, no signup, no auth. Just make a GET request. Great for getting started fast.
2. **Jamendo** (best free content) — Free signup, full track previews, generous rate limit.

### Quick Start URLs

**iTunes** (no auth needed):
```
https://itunes.apple.com/search?term=beatles&media=music&limit=10
```

**Jamendo** (needs client_id):
```
https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_ID&search=beatles&limit=10
```

## Minimum Features (Required)

Your API must have these 4 endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/search?q=query | Search for tracks |
| GET | /api/favorites | Get all saved favorites |
| POST | /api/favorites | Save a track to favorites |
| DELETE | /api/favorites/:id | Remove a favorite |

## Planning Phase

### Step 0: Understand the Scope
- This is a **backend-only** project (no frontend)
- You'll test everything with **Postman** or **Thunder Client**
- The music API provides the music data
- PostgreSQL stores the user's favorites

### Step 1: Choose Your Music API
The starter code uses **iTunes** (no auth required). If you want to use a different API:
1. Pick one from the table above
2. Sign up and get credentials if needed
3. Update `config/music.js` with the new API's URL and response format

### Step 2: Database Setup
**Option A: Local PostgreSQL**
```bash
# Mac
createdb music_favorites_db

# Windows
psql -U postgres -c "CREATE DATABASE music_favorites_db;"
```

**Option B: Supabase Cloud (free)**
1. Go to https://supabase.com → create project
2. Copy the connection string from Settings → Database

### Step 3: Data Model

```
Favorites Table:
- id (SERIAL, auto-generated)
- trackId (STRING, unique, required) — the unique track ID from the music API
- trackName (STRING, required)
- artistName (STRING, required)
- albumName (STRING, required)
- previewUrl (STRING, optional)
- imageUrl (STRING, required)
- addedAt (DATE, default: now)
- createdAt, updatedAt (timestamps)
```

## Implementation Phase

### Phase 1: Project Setup
```bash
mkdir music-explorer
cd music-explorer
npm init -y
npm install express sequelize pg pg-hstore dotenv cors
npm install --save-dev nodemon
```

Create folder structure:
```
├── config/
│   ├── database.js     # Sequelize connection
│   └── music.js      # music API auth + search
├── models/
│   └── Favorite.js     # Favorite model
├── routes/
│   ├── search.js       # GET /api/search
│   └── favorites.js    # CRUD /api/favorites
├── .env
├── .env.example
├── .gitignore
└── server.js
```

### Phase 2: Database Connection (config/database.js)
1. Import Sequelize and dotenv
2. Create Sequelize instance with env variables
3. Handle both local and cloud (DATABASE_URL) connections
4. Export sequelize instance

### Phase 3: Favorite Model (models/Favorite.js)
1. Define model with sequelize.define()
2. Add all fields with DataTypes and validations
3. Set trackId as unique
4. Export the model

### Phase 4: Music API (config/music.js)
This file is **provided for you** — it uses the iTunes Search API (no auth needed).
1. `searchTracks(query)` — GET from iTunes search endpoint
2. Transforms response into simplified track objects (id, name, artist, album, preview_url, image)
3. If you want a different API, update this file

### Phase 5: Search Route (routes/search.js)
1. Create GET '/' route
2. Validate query parameter exists
3. Call searchTracks() from config/music.js
4. Return formatted results

### Phase 6: Favorites Routes (routes/favorites.js)
1. POST '/' — validate fields, check for duplicate trackId, create favorite
2. GET '/' — findAll sorted by addedAt DESC
3. GET '/:id' — findByPk, return 404 if not found
4. DELETE '/:id' — findByPk + destroy, return 404 if not found

### Phase 7: Server Setup (server.js)
1. Import everything and configure middleware
2. Sync database with sequelize.sync()
3. Mount routes at /api/search and /api/favorites
4. Add root route and 404 handler
5. Start server

### Phase 8: Test Everything
Use Postman or the included collection to test all endpoints.

## Testing

### Using the Postman Collection
```bash
# Terminal 1: Start server
npm start

# Terminal 2: Run tests (if newman installed)
npm test
```

### Manual Testing with Postman/Thunder Client

**1. Search for tracks:**
```
GET http://localhost:3000/api/search?q=beatles
```

**2. Save a favorite** (copy a track from search results):
```
POST http://localhost:3000/api/favorites
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

**3. Get all favorites:**
```
GET http://localhost:3000/api/favorites
```

**4. Delete a favorite:**
```
DELETE http://localhost:3000/api/favorites/1
```

## Project Submission Checklist

```
Music API Integration:
[ ] Client Credentials auth working (getAccessToken)
[ ] Search returns simplified track objects
[ ] API errors handled (rate limiting, bad queries)

Database:
[ ] PostgreSQL database created (local or Supabase)
[ ] Sequelize connection working
[ ] Favorite model with proper DataTypes and validations
[ ] trackId is unique (prevents duplicates)

API Endpoints:
[ ] GET /api/search?q=query returns music search results
[ ] POST /api/favorites saves a track
[ ] GET /api/favorites returns all saved tracks
[ ] DELETE /api/favorites/:id removes a track
[ ] Proper status codes (200, 201, 400, 404, 500)

Code Quality:
[ ] MVC-ish structure (config/, models/, routes/)
[ ] .env for secrets (not committed)
[ ] .env.example provided
[ ] .gitignore includes node_modules and .env
[ ] try/catch error handling in all routes
[ ] No hardcoded credentials
```

## Bonus Features

If you finish early:
1. **GET /api/favorites/:id** — get a single favorite by ID
2. **Playlist support** — create playlists and add favorites to them
3. **Advanced search** — search by artist or album (type parameter)
4. **Pagination** — limit and offset on favorites
5. **Statistics** — GET /api/stats returns total favorites, top artists
6. **Track details** — GET /api/tracks/:trackId fetches full track info from the music API
7. **Search history** — save and display recent searches

## Common Pitfalls

1. **Forgetting SSL for Supabase** — add `dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }` for cloud
2. **Not handling duplicate favorites** — check trackId before creating
3. **Hardcoding API credentials** — always use .env
4. **Not awaiting async calls** — all Sequelize and fetch calls need await
5. **Forgetting to sync** — call sequelize.sync() before starting the server

## Tips for Success

1. **Get the search working first** — test searchTracks() before building routes
2. **Test one endpoint at a time** — don't build everything then test
3. **Use Beekeeper Studio** — visually verify your data is being saved
4. **Read error messages** — Sequelize validation errors tell you exactly what's wrong
5. **Commit after each phase** — save your progress frequently
