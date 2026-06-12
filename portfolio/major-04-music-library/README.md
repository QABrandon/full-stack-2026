# Major 04: Music Explorer API

FS12 Week 12 Session 3 — Express + Sequelize REST API. Search tracks via iTunes, save favorites to PostgreSQL. **No frontend** — tested with Postman/Newman.

## Related locations

| Location | Purpose |
| --- | --- |
| `portfolio/major-04-music-library/` (this folder) | Portfolio overview for the site project card |
| `~/Desktop/BM Work/My Projects/FS Bootcamp/music-library/` | **Local original** — source, Postman collection, README |
| [github.com/QABrandon/music-library](https://github.com/QABrandon/music-library) | Remote submission repo |

Source code lives in the submission folder only. This portfolio directory holds a short overview; the site card links to GitHub so visitors can clone and run the API locally.

## Quick verify

```bash
git clone https://github.com/QABrandon/music-library.git
cd music-library
npm install
createdb music_favorites_db   # Mac — skip if DB exists
cp .env.example .env          # set DB_USER (Mac: whoami)
npm run dev
```

Import `Music-Explorer.postman_collection.json` and set `baseUrl` to match your `PORT` (default `http://localhost:3000`).
