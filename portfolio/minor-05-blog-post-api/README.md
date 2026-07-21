# Minor 05: Blog Post API

FS12 Week 11 Session 3 — Express REST API for blog **posts** and **users**.
MVC routes and controllers, input validation, error middleware, and Newman/Postman
tests. **No frontend** — run locally and test with Postman or Newman.

## Related locations

| Location | Purpose |
| --- | --- |
| `portfolio/minor-05-blog-post-api/` (this folder) | Portfolio overview for the site project card |
| `~/Desktop/BM Work/My Projects/FS Bootcamp/blog-post-api/` | **Local original** — source, Postman collection, README |
| [github.com/QABrandon/blog-post-api](https://github.com/QABrandon/blog-post-api) | Remote submission repo |

Source code lives in the submission folder only. This portfolio directory holds a
short overview; the site card links to GitHub so visitors can clone and run the
API locally.

## What it covers

- Posts and users CRUD at `/api/posts` and `/api/users`
- Express Router, controllers, and shared error-handling middleware
- In-memory storage (resets when the server restarts)
- JSON API documentation at `GET /` and health check at `GET /health`
- Newman collection: 17 requests with validation and 404 coverage

## Quick verify

```bash
git clone https://github.com/QABrandon/blog-post-api.git
cd blog-post-api
npm install
npm run dev
```

Server runs at `http://localhost:3000`. Open that URL in a browser to read the
JSON API documentation.

In a second terminal:

```bash
npm test
```

Import `Blog-Post-API.postman_collection.json` for manual testing in Postman.
