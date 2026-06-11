# Sequelize Code-Along: Music Playlist API

Build a minimal Express + Sequelize app with **3 tables**, relationships, validations, and seed data.

## Database Diagram

```mermaid
erDiagram
    USER ||--o{ PLAYLIST : "has many"
    PLAYLIST ||--o{ SONG : "has many"

    USER {
        int id PK
        string username UK "unique, 3-20 chars"
        string email UK "unique, valid email"
        datetime createdAt
        datetime updatedAt
    }

    PLAYLIST {
        int id PK
        string name "required, max 100 chars"
        string genre "optional"
        int userId FK "belongs to User"
        datetime createdAt
        datetime updatedAt
    }

    SONG {
        int id PK
        string title "required"
        string artist "required"
        int duration "seconds, min 1"
        int playlistId FK "belongs to Playlist"
        datetime createdAt
        datetime updatedAt
    }
```

## Setup

```bash
npm install
createdb playlist_app        # Mac
psql -U postgres -c "CREATE DATABASE playlist_app;"  # Windows
```

## Your Tasks

1. Complete the **database connection** in `config/database.js`
2. Define the **User**, **Playlist**, and **Song** models with validations
3. Set up **relationships** in `models/index.js`
4. Write the **seed data** in `seed.js`
5. Build the **Express routes** in `server.js`

Then:

```bash
npm run seed
npm start
```

## Endpoints to Build

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create a user |
| GET | /api/playlists | Get all playlists (with user + songs) |
| POST | /api/playlists | Create a playlist |
| GET | /api/playlists/:id | Get one playlist (with user + songs) |
| POST | /api/playlists/:id/songs | Add a song to a playlist |
