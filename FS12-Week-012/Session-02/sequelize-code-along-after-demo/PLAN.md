# Sequelize Code-Along: Music Playlist API

## Project Overview

Build a Music Playlist API using Express + Sequelize with 3 related tables. You'll define models, add validations, set up relationships, seed data, and create read/write endpoints.

## Database Diagram

```mermaid
erDiagram
    USER ||--o PLAYLIST : "has many"
    PLAYLIST ||--o SONG : "has many"

    USER {
        int id PK
        string username UK "unique, 3-20 chars"
        string email UK "unique, valid email"
    }

    PLAYLIST {
        int id PK
        string name "required, max 100 chars"
        string genre "optional"
        int userId FK
    }

    SONG {
        int id PK
        string title "required"
        string artist "required"
        int duration "seconds, min 1"
        int playlistId FK
    }
```

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and update your password if needed:

```bash
cp .env.example .env
```

Create the database:

```bash
# Mac
createdb playlist_app

# Windows
psql -U postgres -c "CREATE DATABASE playlist_app;"
```

## Step-by-Step Instructions

### Step 1: Database Connection (`config/database.js`)

Set up the Sequelize connection to PostgreSQL.

1. Import `Sequelize` from `"sequelize"` and require `"dotenv"` config
2. Create a `new Sequelize()` instance with three arguments:
   - `process.env.DB_NAME || "playlist_app"`
   - `process.env.DB_USER || "postgres"`
   - `process.env.DB_PASSWORD || ""`
3. Pass an options object as the 4th argument:
   - `host`: `process.env.DB_HOST || "localhost"`
   - `dialect`: `"postgres"`
   - `logging`: `false`
4. Export `sequelize`

**Test it:** Add this temporarily at the bottom and run `node config/database.js`:

```javascript
sequelize.authenticate()
  .then(() => console.log("Connected!"))
  .catch(err => console.error("Failed:", err.message));
```

You should see "Connected!" — then remove the test code.

---

### Step 2: User Model (`models/User.js`)

1. Use `sequelize.define("User", { ... })` to create the model
2. Add `username` field:
   - `type: DataTypes.STRING(20)`
   - `allowNull: false`
   - `unique: true`
   - `validate: { len: { args: [3, 20], msg: "Username must be between 3 and 20 characters" } }`
3. Add `email` field:
   - `type: DataTypes.STRING`
   - `allowNull: false`
   - `unique: true`
   - `validate: { isEmail: { msg: "Must be a valid email address" } }`
4. Export the model

---

### Step 3: Playlist Model (`models/Playlist.js`)

1. Use `sequelize.define("Playlist", { ... })`
2. Add `name` field:
   - `type: DataTypes.STRING(100)`
   - `allowNull: false`
   - `validate: { notEmpty: { msg: "Playlist name cannot be empty" } }`
3. Add `genre` field:
   - `type: DataTypes.STRING(50)`
   - No constraints (optional field)
4. Export the model

---

### Step 4: Song Model (`models/Song.js`)

1. Use `sequelize.define("Song", { ... })`
2. Add `title` field:
   - `type: DataTypes.STRING(200)`
   - `allowNull: false`
   - `validate: { notEmpty: { msg: "Song title cannot be empty" } }`
3. Add `artist` field:
   - `type: DataTypes.STRING(100)`
   - `allowNull: false`
   - `validate: { notEmpty: { msg: "Artist name cannot be empty" } }`
4. Add `duration` field:
   - `type: DataTypes.INTEGER`
   - `validate: { min: { args: [1], msg: "Duration must be at least 1 second" } }`
5. Export the model

---

### Step 5: Relationships (`models/index.js`)

This is where you connect the tables together. Add these lines:

1. **User → Playlist** (one-to-many):
   ```javascript
   User.hasMany(Playlist, { foreignKey: "userId", onDelete: "CASCADE" });
   Playlist.belongsTo(User, { foreignKey: "userId" });
   ```

2. **Playlist → Song** (one-to-many):
   ```javascript
   Playlist.hasMany(Song, { foreignKey: "playlistId", onDelete: "CASCADE" });
   Song.belongsTo(Playlist, { foreignKey: "playlistId" });
   ```

**What this does:**
- `hasMany` adds a `userId` column to the Playlists table
- `belongsTo` lets you include the User when querying a Playlist
- `onDelete: "CASCADE"` means if you delete a User, their Playlists are deleted too

---

### Step 6: Seed Data (`seed.js`)

1. Create 3 users with `User.create()` — save each to a variable (`alice`, `bob`, `charlie`)
2. Create 3 playlists with `Playlist.create()` — use `userId: alice.id` etc.
3. Create songs with `Song.bulkCreate([...])` — use `playlistId: chill.id` etc.

**Run it:**

```bash
npm run seed
```

You should see "Tables created!" and "Seed data inserted!"

**Verify in Beekeeper Studio:** Connect and check that `Users`, `Playlists`, and `Songs` tables have data.

---

### Step 7: Server Routes (`server.js`)

Build these 6 endpoints one at a time. Test each one before moving to the next.

#### 7a. GET /api/users

```javascript
app.get("/api/users", async (req, res) => {
  // User.findAll() → res.json(users)
});
```

**Test:** `http://localhost:3000/api/users` should return your 3 seeded users.

#### 7b. POST /api/users

```javascript
app.post("/api/users", async (req, res) => {
  // User.create(req.body) → res.status(201).json(user)
  // catch → res.status(400)
});
```

**Test with Postman/Thunder Client:**
```json
POST http://localhost:3000/api/users
Body: { "username": "diana", "email": "diana@example.com" }
```

#### 7c. GET /api/playlists

```javascript
app.get("/api/playlists", async (req, res) => {
  // Playlist.findAll() with include:
  //   - User model (attributes: ["id", "username"])
  //   - Song model
  // Order by createdAt DESC
});
```

**Test:** Should return playlists with their user info and songs nested inside.

#### 7d. POST /api/playlists

```javascript
app.post("/api/playlists", async (req, res) => {
  // Playlist.create(req.body) → res.status(201)
  // req.body needs: name, genre, userId
});
```

**Test:**
```json
POST http://localhost:3000/api/playlists
Body: { "name": "Study Music", "genre": "Classical", "userId": 1 }
```

#### 7e. GET /api/playlists/:id

```javascript
app.get("/api/playlists/:id", async (req, res) => {
  // Playlist.findByPk(req.params.id) with same includes
  // Return 404 if not found
});
```

**Test:** `http://localhost:3000/api/playlists/1` should show one playlist with user + songs.

#### 7f. POST /api/playlists/:id/songs

```javascript
app.post("/api/playlists/:id/songs", async (req, res) => {
  // Find playlist first → 404 if not found
  // Song.create() with title, artist, duration from req.body + playlistId from playlist
  // Return 201
});
```

**Test:**
```json
POST http://localhost:3000/api/playlists/1/songs
Body: { "title": "New Song", "artist": "New Artist", "duration": 240 }
```

---

### Step 8: Start and Test Everything

```bash
npm start
```

Run through all endpoints and verify:

```
GET  http://localhost:3000/api/users          → 3+ users
POST http://localhost:3000/api/users          → creates user
GET  http://localhost:3000/api/playlists      → playlists with users & songs
POST http://localhost:3000/api/playlists      → creates playlist
GET  http://localhost:3000/api/playlists/1    → single playlist with details
POST http://localhost:3000/api/playlists/1/songs → adds song to playlist
```

## Validation Tests

Try these to see your validations in action:

```json
// Should fail — username too short
POST /api/users
{ "username": "ab", "email": "test@test.com" }

// Should fail — invalid email
POST /api/users
{ "username": "testuser", "email": "not-an-email" }

// Should fail — duplicate username
POST /api/users
{ "username": "alice", "email": "alice2@example.com" }

// Should fail — empty title
POST /api/playlists
{ "name": "", "userId": 1 }

// Should fail — empty song title
POST /api/playlists/1/songs
{ "title": "", "artist": "Someone", "duration": 200 }
```

## Key Concepts Checklist

```
Models & DataTypes:
[ ] Defined User model with STRING, validations
[ ] Defined Playlist model with STRING
[ ] Defined Song model with STRING, INTEGER

Validations & Constraints:
[ ] allowNull: false (required fields)
[ ] unique: true (username, email)
[ ] len validator (username length)
[ ] isEmail validator
[ ] notEmpty validator
[ ] min validator (duration)

Relationships:
[ ] User hasMany Playlists
[ ] Playlist belongsTo User
[ ] Playlist hasMany Songs
[ ] Song belongsTo Playlist
[ ] CASCADE delete works

Seeding:
[ ] Created users, playlists, songs
[ ] Used foreign keys (userId, playlistId)
[ ] bulkCreate for multiple songs

Routes:
[ ] GET and POST for users
[ ] GET all and GET one for playlists
[ ] POST for playlists with userId
[ ] POST nested route for songs
[ ] Include (eager loading) for related data
[ ] 404 handling for not found
```
