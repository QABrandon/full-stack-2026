# Music Explorer (Sequelize) - Assessment Rubric

## Must Have (Required for Passing)

### Express.js API Implementation
- [ ] Express server created and configured
- [ ] CORS and JSON middleware applied
- [ ] Routes mounted with proper base paths
- [ ] Request/response handling with proper status codes
- [ ] Root route returns API info

### PostgreSQL/Sequelize Integration
- [ ] Database connection configured (local or Supabase)
- [ ] Sequelize connection with environment variables
- [ ] Favorite model defined with proper DataTypes
- [ ] Validation rules on required fields
- [ ] Unique constraint on trackId
- [ ] Error handling for database operations

### Third-Party API Integration
- [ ] Client Credentials OAuth flow implemented
- [ ] getAccessToken() function working
- [ ] searchTracks() function queries music API
- [ ] Response transformed to simplified track objects
- [ ] Error handling for API failures and rate limiting

### API Endpoints
- [ ] GET /api/search?q=query — searches for tracks, validates query param
- [ ] POST /api/favorites — saves track, validates fields, prevents duplicates
- [ ] GET /api/favorites — returns all favorites sorted by date
- [ ] DELETE /api/favorites/:id — removes favorite, handles not found

### Environment and Configuration
- [ ] .env file with all secrets (not committed)
- [ ] .env.example provided
- [ ] .gitignore includes node_modules and .env
- [ ] No hardcoded credentials in code

## Could Have (Bonus Points)

- [ ] GET /api/favorites/:id — single favorite endpoint
- [ ] Playlist support (additional model + routes)
- [ ] Advanced search (by artist, album, or type)
- [ ] Pagination on favorites (limit/offset)
- [ ] Track details endpoint (fetch full track info from music API)
- [ ] Statistics endpoint (total favorites, top artists)
- [ ] Search history tracking

## Submission Requirements

### Technical
- [ ] Project runs with `npm install && npm start`
- [ ] Music search returns results
- [ ] Favorites persist in PostgreSQL
- [ ] All 4 required endpoints work

### Project Structure
- [ ] config/ folder (database.js, music.js)
- [ ] models/ folder (Favorite.js)
- [ ] routes/ folder (search.js, favorites.js)
- [ ] server.js at root

### API Interface
- [ ] RESTful URL design
- [ ] Consistent JSON response format
- [ ] Appropriate HTTP status codes (200, 201, 400, 404, 500)
- [ ] Meaningful error messages

### Code Quality
- [ ] Clean, readable code
- [ ] try/catch error handling in all routes
- [ ] No hardcoded secrets
- [ ] Comments where logic isn't obvious

**Due Date:** June 13
**Submission Method:** Github Repo link on #project-showcase channel