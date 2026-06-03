# SQL vs Sequelize: Side-by-Side Comparison

## Creating Tables

### Raw SQL

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  genre VARCHAR(50),
  "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(100) NOT NULL,
  duration INTEGER,
  "playlistId" INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sequelize

```javascript
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email:    { type: DataTypes.STRING,     allowNull: false, unique: true }
});

const Playlist = sequelize.define("Playlist", {
  name:  { type: DataTypes.STRING(100), allowNull: false },
  genre: { type: DataTypes.STRING(50) }
});

const Song = sequelize.define("Song", {
  title:    { type: DataTypes.STRING(200), allowNull: false },
  artist:   { type: DataTypes.STRING(100), allowNull: false },
  duration: { type: DataTypes.INTEGER }
});

User.hasMany(Playlist, { foreignKey: "userId", onDelete: "CASCADE" });
Playlist.belongsTo(User, { foreignKey: "userId" });
Playlist.hasMany(Song, { foreignKey: "playlistId", onDelete: "CASCADE" });
Song.belongsTo(Playlist, { foreignKey: "playlistId" });
```

**What Sequelize handles for you:** `id`, `createdAt`, `updatedAt`, foreign key columns, and table creation.

---

## INSERT

### Raw SQL

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com')
RETURNING *;
```

### Sequelize

```javascript
const alice = await User.create({ username: "alice", email: "alice@example.com" });
```

### Raw SQL — with foreign key

```sql
INSERT INTO playlists (name, genre, "userId")
VALUES ('Chill Vibes', 'Lo-fi', 1)
RETURNING *;
```

### Sequelize

```javascript
const playlist = await Playlist.create({ name: "Chill Vibes", genre: "Lo-fi", userId: alice.id });
```

### Raw SQL — multiple rows

```sql
INSERT INTO songs (title, artist, duration, "playlistId")
VALUES
  ('Sunset Drive', 'Lo-fi Beats', 195, 1),
  ('Rainy Day', 'Chillhop', 224, 1),
  ('Coffee Shop', 'Jazz Cats', 180, 1);
```

### Sequelize

```javascript
await Song.bulkCreate([
  { title: "Sunset Drive", artist: "Lo-fi Beats", duration: 195, playlistId: 1 },
  { title: "Rainy Day",    artist: "Chillhop",    duration: 224, playlistId: 1 },
  { title: "Coffee Shop",  artist: "Jazz Cats",   duration: 180, playlistId: 1 },
]);
```

---

## SELECT

### All rows

```sql
SELECT * FROM users;
```

```javascript
const users = await User.findAll();
```

### One row by ID

```sql
SELECT * FROM playlists WHERE id = 1;
```

```javascript
const playlist = await Playlist.findByPk(1);
```

### With conditions

```sql
SELECT * FROM songs WHERE duration > 200 ORDER BY title ASC;
```

```javascript
const songs = await Song.findAll({
  where: { duration: { [Op.gt]: 200 } },
  order: [["title", "ASC"]]
});
```

### With JOIN (related data)

```sql
SELECT p.*, u.id AS "userId", u.username
FROM playlists p
JOIN users u ON p."userId" = u.id
ORDER BY p."createdAt" DESC;
```

```javascript
const playlists = await Playlist.findAll({
  include: [{ model: User, attributes: ["id", "username"] }],
  order: [["createdAt", "DESC"]]
});
```

### Nested JOIN (playlist + user + songs)

```sql
SELECT p.*, u.username, s.*
FROM playlists p
JOIN users u ON p."userId" = u.id
LEFT JOIN songs s ON s."playlistId" = p.id
WHERE p.id = 1;
```

```javascript
const playlist = await Playlist.findByPk(1, {
  include: [
    { model: User, attributes: ["id", "username"] },
    { model: Song }
  ]
});
```

---

## UPDATE

### One row

```sql
UPDATE users SET username = 'alice_updated' WHERE id = 1 RETURNING *;
```

```javascript
const user = await User.findByPk(1);
user.username = "alice_updated";
await user.save();
```

### Multiple rows

```sql
UPDATE songs SET duration = 0 WHERE duration IS NULL;
```

```javascript
await Song.update({ duration: 0 }, { where: { duration: null } });
```

---

## DELETE

### One row

```sql
DELETE FROM songs WHERE id = 3 RETURNING *;
```

```javascript
const song = await Song.findByPk(3);
await song.destroy();
```

### By condition

```sql
DELETE FROM songs WHERE duration < 60;
```

```javascript
await Song.destroy({ where: { duration: { [Op.lt]: 60 } } });
```

### CASCADE in action

```sql
-- Deleting a user also deletes their playlists AND those playlists' songs
DELETE FROM users WHERE id = 1;
```

```javascript
const user = await User.findByPk(1);
await user.destroy();
// Playlists and songs are automatically deleted (CASCADE)
```

---

## Quick Reference

| SQL | Sequelize |
|-----|-----------|
| `CREATE TABLE` | `sequelize.define()` + `sequelize.sync()` |
| `INSERT INTO` | `Model.create()` or `Model.bulkCreate()` |
| `SELECT *` | `Model.findAll()` |
| `SELECT WHERE id =` | `Model.findByPk()` |
| `SELECT WHERE` | `Model.findAll({ where: {} })` |
| `SELECT ... JOIN` | `Model.findAll({ include: [] })` |
| `UPDATE ... SET` | `instance.save()` or `Model.update()` |
| `DELETE FROM` | `instance.destroy()` or `Model.destroy()` |
| `REFERENCES ... ON DELETE CASCADE` | `hasMany({ onDelete: "CASCADE" })` |
| `NOT NULL` | `allowNull: false` |
| `UNIQUE` | `unique: true` |
| `VARCHAR(100)` | `DataTypes.STRING(100)` |
| `TEXT` | `DataTypes.TEXT` |
| `INTEGER` | `DataTypes.INTEGER` |
| `SERIAL PRIMARY KEY` | *(automatic)* |
| `TIMESTAMP DEFAULT NOW()` | `timestamps: true` *(default)* |
