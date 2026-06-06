# Music Explorer - Student Run-Through Report

**Date:** 2026-04-18
**Practice Location:** /tmp/student-practice/music-explorer/
**Node Version:** v24.10.0
**Music API Used:** iTunes Search API (no auth required)

---

## Setup Phase

### Step 1: Copy project-start files and npm install
- Copied all files from project-start/ to /tmp/student-practice/music-explorer/
- Ran `npm install` -- completed in ~4 seconds, 135 packages installed
- One deprecation warning: `dottie@2.0.7` is no longer supported. This is a transitive dependency of Sequelize and not something a student can fix. It did not cause any problems.
- **No issues encountered.**

### Step 2: Create the database
- Ran `createdb music_favorites_db` -- completed silently (success on Mac)
- **No issues encountered.** PostgreSQL was already running locally.

### Step 3: Create .env from .env.example
- Copied .env.example to .env
- Changed `DB_USER=postgres` to `DB_USER=codecademy` (Mac default user)
- Left `DB_PASSWORD=` empty (Mac PostgreSQL typically uses peer/trust auth)
- Left all other values as defaults
- **No issues encountered.**

### Observation on .env.example
- The .env.example file defaults `DB_USER=postgres`, which is the Windows/Linux convention. The PLAN.md and README.md both mention using `codecademy` for Mac, which is correct. A student on Mac who blindly copies the .env.example without reading the instructions would get a connection error. **Suggestion:** Add a comment in .env.example noting "Use your system username on Mac (e.g., codecademy)."

---

## Implementation Phase

### config/database.js
**What I did:**
- Imported `Sequelize` from 'sequelize' and `dotenv`
- Created conditional logic: if `DATABASE_URL` exists, use it with SSL options; otherwise use individual env vars (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`)
- Created `connectDatabase()` async function with try/catch, calling `sequelize.authenticate()`
- Exported `{ sequelize, connectDatabase }`

**Difficulty level:** Easy. The TODO comments mapped almost 1:1 to the code needed.

**Potential student confusion:** The instructions say to handle both local and cloud (DATABASE_URL) connections, but most students will only use one. A student might wonder if they need to set up Supabase too. The PLAN.md is clear that it is Option A vs Option B, which helps.

### models/Favorite.js
**What I did:**
- Used `sequelize.define('Favorite', { ... })` with all specified fields
- Added DataTypes, allowNull, unique, and validate constraints as specified
- Set `tableName: 'favorites'` in options
- Exported the model

**Difficulty level:** Easy. The TODO comments are extremely detailed -- essentially pseudocode. Every field, type, and validation is spelled out.

**Potential student confusion:** None. The `validate: { notEmpty: { msg: '...' } }` syntax is a bit nested but the comments show exactly what to do.

### routes/search.js
**What I did:**
- Created `router.get('/')` async handler
- Read `req.query.q`, returned 400 if missing
- Called `searchTracks(query)` and returned `{ query, count, tracks }`
- Added try/catch with 500 error response

**Difficulty level:** Easy. The structure was already set up with express.Router() and the import of `searchTracks`.

**Potential student confusion:** None. Straightforward REST endpoint.

### routes/favorites.js
**What I did:**
- POST '/': Destructured body, validated required fields, checked for duplicates with `findOne`, created with `Favorite.create`, returned 201
- GET '/': Used `findAll` with `order: [['addedAt', 'DESC']]`, returned count + array
- GET '/:id': Used `findByPk`, returned 404 if not found
- DELETE '/:id': Used `findByPk`, called `destroy()`, returned success message + deleted record

**Difficulty level:** Medium. This is the most code-heavy file with 4 route handlers. The TODO comments are detailed enough that each step is clear.

**Potential student confusion:**
1. The double-array syntax for `order: [['addedAt', 'DESC']]` might trip up students who write `order: ['addedAt', 'DESC']` (single array). Sequelize would throw a confusing error.
2. Students might forget to `await` the Sequelize calls (the PLAN.md "Common Pitfalls" section mentions this).

### server.js
**What I did:**
- Imported express, cors, dotenv, and the database config
- Called `dotenv.config()`
- Created Express app, set PORT
- Applied cors() and express.json() middleware
- Imported and mounted search and favorites routers
- Added root GET '/' route with welcome message and endpoint listing
- Added 404 catch-all handler
- Created async `startServer()` that connects DB, syncs, and listens

**Difficulty level:** Easy. Standard Express boilerplate.

**Potential student confusion:** The order of `dotenv.config()` call matters. In the starter code, `dotenv.config()` is called in server.js, but `config/database.js` also needs env vars and is imported before `dotenv.config()` is called. This could be a problem if database.js reads env vars at import time. I solved this by also calling `require('dotenv').config()` at the top of database.js. **This is a subtle bug in the starter code design** -- if a student only calls `dotenv.config()` in server.js (as the TODO suggests), the env vars might not be loaded when database.js is imported. However, since database.js reads env vars inside the conditional (at module load time), and server.js imports database.js before calling dotenv.config(), a student following the TODOs literally would have env vars as `undefined`. **My fix:** I added `require('dotenv').config()` in database.js as well, which makes it self-contained.

---

## Testing Phase

### Server Startup
- First attempt failed with `EADDRINUSE: address already in use :::3000` -- port 3000 was occupied by another process
- Killed the existing process and restarted successfully
- Server output: "Connected to PostgreSQL successfully!" followed by "Music Explorer API running on http://localhost:3000"
- **Student note:** Port conflicts are common. The error message is clear enough that students should be able to figure out to kill the other process or change the PORT in .env.

### Endpoint Test Results

| # | Test | Method | URL | Expected Status | Actual Status | Result |
|---|------|--------|-----|----------------|---------------|--------|
| 1 | Root welcome | GET | / | 200 | 200 | PASS |
| 2 | Search with query | GET | /api/search?q=beatles | 200 | 200 | PASS |
| 3 | Search without query | GET | /api/search | 400 | 400 | PASS |
| 4 | Save a favorite | POST | /api/favorites | 201 | 201 | PASS |
| 5 | Duplicate favorite | POST | /api/favorites | 400 | 400 | PASS |
| 6 | Get all favorites | GET | /api/favorites | 200 | 200 | PASS |
| 7 | Get single favorite | GET | /api/favorites/1 | 200 | 200 | PASS |
| 8 | Delete non-existent | DELETE | /api/favorites/99999 | 404 | 404 | PASS |
| 9 | Delete existing | DELETE | /api/favorites/1 | 200 | 200 | PASS |
| 10 | Favorites after delete | GET | /api/favorites | 200 (empty) | 200 (empty) | PASS |
| 11 | Missing required fields | POST | /api/favorites | 400 | 400 | PASS |
| 12 | Unknown route | GET | /nonexistent | 404 | 404 | PASS |

**All 12 tests passed.**

### Search Results Quality
- Searching "beatles" returned 10 tracks (the configured limit)
- Results included expected tracks: "Here Comes the Sun", "Yesterday", "Hey Jude", "Let It Be", "Come Together"
- Each track object had: id, name, artist, album, preview_url, image -- all populated
- One result was John Lennon's "Imagine" (not strictly The Beatles), which is expected iTunes behavior
- Preview URLs and image URLs were all valid HTTPS links

### Favorites CRUD Flow
- POST correctly created a record with auto-generated id, addedAt, createdAt, updatedAt
- Duplicate detection worked via the application-level `findOne` check (returned "Track is already in favorites")
- GET all returned proper `{ count, favorites }` structure with DESC ordering
- GET by ID returned the full record
- DELETE returned the deleted record in the response (useful for client-side cache invalidation)
- After deletion, GET all returned `{ count: 0, favorites: [] }`

### Newman/Postman Collection
- Newman was not installed on this system (`newman not installed`)
- No Postman collection file was found in the project directory
- The PLAN.md references "the included collection" and `npm test`, but the package.json has no test script and no collection file exists
- **Suggestion:** Either include a Postman collection JSON file or remove references to newman/npm test from the PLAN.md

---

## Issues and Observations

### Issues Encountered

1. **Port conflict (EADDRINUSE):** Port 3000 was already in use. Had to kill the existing process. This is a common student issue. Severity: Low. Easy to resolve.

2. **dotenv loading order:** The starter code's TODO structure suggests calling `dotenv.config()` only in server.js, but database.js is imported before that call and reads env vars at module load time. I preemptively fixed this by calling `require('dotenv').config()` in database.js as well. If a student does not do this, they would get a connection error because DB_NAME, DB_USER, etc. would be undefined. **Severity: Medium.** This would be confusing for students. **Suggestion:** Either add a TODO in database.js to call dotenv.config(), or restructure the imports so dotenv is loaded first.

3. **Missing Postman collection and test script:** The PLAN.md references running tests with newman and `npm test`, but neither exists. **Severity: Low.** Students can test manually.

4. **dottie deprecation warning:** npm install shows a deprecation warning for dottie@2.0.7 (a Sequelize dependency). This is cosmetic and does not affect functionality. Students might worry about it.

### What Worked Well

1. **iTunes API requires no auth** -- This is a huge win for student experience. No signup, no API keys, no token management. Students can focus on the Sequelize/Express learning objectives.

2. **The TODO comments are very detailed** -- Each file has step-by-step instructions that read almost like pseudocode. A student who reads carefully should be able to complete each section.

3. **The project structure is clean** -- Separation of concerns (config/, models/, routes/) is well-organized and teaches good patterns.

4. **config/music.js is provided complete** -- This lets students focus on the database and REST API aspects rather than getting stuck on external API integration.

5. **Error handling is well-specified** -- The TODOs explicitly mention try/catch, status codes, and error messages.

### What Could Be Confusing for Students

1. **The dotenv loading order issue** (described above) is the biggest potential stumbling block.

2. **Sequelize `order` syntax** -- `order: [['addedAt', 'DESC']]` uses double-nested arrays, which is unusual and not intuitive.

3. **The .env.example defaults to DB_USER=postgres** but Mac users need their system username. The README mentions this but a student might miss it.

4. **`sequelize.sync({ alter: true })`** -- Students might not understand the difference between `sync()`, `sync({ force: true })`, and `sync({ alter: true })`. The PLAN.md does not explain this.

5. **No .gitignore file is included** in project-start, despite the PLAN.md checklist mentioning it. Students would need to create one.

---

## Time Estimate

For a student who reads the PLAN.md carefully and follows the TODOs:
- **Setup (Steps 1-3):** 10-15 minutes
- **Implementation (database.js, Favorite.js, search.js, favorites.js, server.js):** 30-45 minutes
- **Testing:** 15-20 minutes
- **Total:** approximately 1-1.5 hours

This assumes the student has prior experience with Express and has used Sequelize at least once. A complete beginner to Sequelize might need 2+ hours.

---

## Recommendations for Improvement

1. **Add `require('dotenv').config()` to the database.js TODO** to prevent the env var loading issue.
2. **Include a .gitignore file** in project-start with node_modules/ and .env.
3. **Add a note to .env.example** about Mac users needing to change DB_USER.
4. **Either include a Postman collection or remove references to newman** from the PLAN.md.
5. **Add a brief explanation of `sync({ alter: true })`** vs `sync()` vs `sync({ force: true })` in the PLAN.md.
6. **Consider adding a package.json test script** that validates the server starts and basic endpoints work, even without newman.

---

## Final Verdict

**The project is well-designed and completable.** The TODO comments provide enough guidance that a student with basic Express knowledge can complete all sections. The iTunes API choice eliminates authentication complexity. The biggest risk is the dotenv loading order issue in database.js, which could cause a confusing "database connection failed" error for students who follow the TODOs literally without adding dotenv to database.js. Overall, this is a solid practice project for learning Sequelize CRUD operations with a REST API.

**All endpoints work correctly. All status codes are correct. The project meets all requirements specified in the PLAN.md.**
