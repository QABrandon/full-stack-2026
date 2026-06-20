# Chore 15: Deploy Application to Production

**Estimated Time:** 45-60 minutes

## Task

Deploy the backend and frontend of **your own project** (the one you built in Chores 11-14) to Render and verify it works end-to-end in production.

## Pre-Deployment Checklist

- [ ] All code from Chores 11-14 committed and pushed to GitHub (Chore 11 repo)
- [ ] `.env` is NOT committed (verify with `git status` and check your `.gitignore`)
- [ ] `.env.example` IS committed (from Chore 13)
- [ ] Frontend runs locally with `npm run dev` (Chore 12)
- [ ] Backend runs locally with `npm run dev` (Chore 13)
- [ ] Backend connects to Supabase Postgres on startup (Chore 14 - "Supabase Postgres connected successfully")

### Minimum Project Requirements

Your project needs at least one full data flow before deploying:

- [ ] At least one Sequelize model in `server/models/`
- [ ] At least one API endpoint in `server.js` (or a routes file) that reads from that model
- [ ] At least one frontend page or component in `client/src/` that fetches and displays the data

If you do not have a working data flow yet, see the **Minimum Working Setup** section below before deploying. Otherwise, skip ahead to **Deploy to Render**.

---

## Minimum Working Setup

Use this only if your own project does not yet have a working model → endpoint → frontend flow. This builds on the Sequelize connection you set up in Chore 14.

### Step 1: Create a Sequelize Model

- [ ] Create `server/models/Item.js`:

  ```javascript
  const { DataTypes } = require("sequelize");
  const { sequelize } = require("../config/db");

  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  module.exports = Item;
  ```

### Step 2: Sync the Model and Add a Seed Script

- [ ] Update `server/server.js` to sync models after the DB connects:

  ```javascript
  const { connectDB, sequelize } = require("./config/db");
  require("./models/Item");

  connectDB().then(() => sequelize.sync());
  ```

- [ ] Create `server/seed.js`:

  ```javascript
  require("dotenv").config();
  const { sequelize } = require("./config/db");
  const Item = require("./models/Item");

  const sampleItems = [
    { name: "First Item", description: "First item in our collection" },
    { name: "Second Item", description: "Second item in our collection" },
    { name: "Third Item", description: "Third item in our collection" },
  ];

  (async () => {
    try {
      await sequelize.sync({ force: true });
      await Item.bulkCreate(sampleItems);
      console.log("Database seeded successfully");
      await sequelize.close();
    } catch (error) {
      console.error("Error seeding database:", error);
      process.exit(1);
    }
  })();
  ```

- [ ] Add the seed script to `server/package.json`:

  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seed.js"
  },
  ```

- [ ] Run the seed: `npm run seed`

### Step 3: Add an API Endpoint

- [ ] Add to `server/server.js` (after the test route from Chore 13):

  ```javascript
  const Item = require("./models/Item");

  app.get("/api/items", async (req, res) => {
    try {
      const items = await Item.findAll();
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items" });
    }
  });
  ```

- [ ] Test in browser: http://localhost:3001/api/items returns the seeded items. (make sure you have the server running)

### Step 4: Add a Frontend Hook and Display

- [ ] Create `client/src/hooks/useItems.js`:

```javascript
import { useState, useEffect } from "react";

export default function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/api/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}
```

- [ ] Update `client/src/App.jsx` to render the items:

  ```javascript
  import useItems from "./hooks/useItems";

  function App() {
    const { items, loading, error } = useItems();

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <h1>My Items</h1>
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  export default App;
  ```

- [ ] Add `VITE_API_URL=http://localhost:3001` to a newly created `client/.env` (and `client/.env.example`).
- [ ] Test locally: backend on http://localhost:3001, frontend on http://localhost:5173 - make sure to start the frontend/backend. Items should display.
- [ ] Commit and push: `git add . && git commit -m "Add minimum working data flow" && git push origin main`

---

## Deploy to Render

> Reference: https://render.com/docs

### Backend (Web Service)

- [ ] Sign up at https://render.com and connect your GitHub account
- [ ] Click **New +** → **Web Service** → select your project repo (from Chore 11)
- Git Connector - Go through the steps to give Render access to your github repo for your project
- [ ] Configure:
  - Name: `your-app-backend`
  - Root Directory: `server`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: `Free`
- [ ] Add environment variables (use the values from your `server/.env` from Chore 14):
  - `DATABASE_URL` = your Supabase Transaction Pooler URL
  - `JWT_SECRET` = your JWT secret (32+ characters)
  - `PORT` = `3001`
  - `NODE_ENV` = `production`
- [ ] Click **Deploy Web Service** and wait for the build (5-10 minutes) - make sure there are no errors in the log - it will show green "Live" if it worked
- [ ] Copy the backend URL (e.g. `https://your-app-backend.onrender.com`)
- [ ] In a browser, hit `https://your-app-backend.onrender.com/api/test` and confirm `{ "message": "Backend is working!" }` (the route from Chore 13)
- [ ] Hit one of your real endpoints (e.g. `/api/items`) and confirm data returns
- [ ] Check the Render **Logs** tab for "Supabase Postgres connected successfully"

### Frontend (Static Site)

- [ ] On Render: **New +** → **Static Site** → select the same repo
- [ ] Configure:
  - Name: `your-app-frontend`
  - Root Directory: `client`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist` (Vite default — Chore 12 used Vite)
- [ ] Add environment variable:
  - `VITE_API_URL` = the backend URL from above (no trailing slash)
- [ ] Click **Deploy Static Site** and wait for the build - look for errors in the logs
- [ ] Copy the frontend URL (e.g. `https://your-app-frontend.onrender.com`) - make sure not to add an extra / at the end

---

## CORS Configuration

The CORS setup from Chore 13/14 uses `app.use(cors())`, which allows all origins. That works for deployment, but if you want to restrict it to your production frontend:

- [ ] Update `server/server.js`:

  ```javascript
  app.use(
    cors({
      origin: [VITE_API_URL],
      credentials: true,
    }),
  );
  ```

- [ ] Commit and push — Render auto-deploys on push to `main`.

---

## Post-Deployment Testing

### Backend

- [ ] `GET https://your-app-backend.onrender.com/api/test` returns the JSON from Chore 13
- [ ] All your project's API endpoints respond as they do locally
- [ ] Render logs show no errors and a successful DB connection

### Frontend

- [ ] Production frontend URL loads in the browser
- [ ] DevTools Console (F12) shows no errors
- [ ] DevTools Network tab shows API calls going to the **production** backend URL (not localhost)
- [ ] Data from the production DB renders on the page
- [ ] All routes/pages and interactive features work

### End-to-End

- [ ] Create / update / delete operations (whatever your project supports) work from the deployed frontend and persist in Supabase
- [ ] Refresh the page — data is still there

---

## Update README

- [ ] Update `README.md` in your repo (created in Chore 11) with your live URLs:

  ```markdown
  ## Live Demo

  - Frontend: https://your-app-frontend.onrender.com
  - Backend API: https://your-app-backend.onrender.com
  ```

- [ ] Commit and push.

---

## Acceptance Criteria

### Repository

- [ ] All work from Chores 11-15 committed and pushed
- [ ] `.env` files NOT in repo, `.env.example` files ARE in repo
- [ ] README has live frontend and backend URLs

### Backend

- [ ] Deployed to Render as a Web Service
- [ ] All env vars from Chore 14 (`DATABASE_URL`, `JWT_SECRET`, `PORT`) configured in Render
- [ ] Render logs show "Supabase Postgres connected successfully"
- [ ] `/api/test` and your project's endpoints respond in production

### Frontend

- [ ] Deployed to Render as a Static Site
- [ ] `VITE_API_URL` points to the production backend (no trailing slash)
- [ ] Loads in the browser with no console errors
- [ ] Network tab confirms API calls go to the production backend

### Database

- [ ] Supabase project from Chore 14 is being used in production
- [ ] Data is seeded or created and persists across reloads

### Integration

- [ ] Frontend ↔ backend ↔ Supabase all wired up end-to-end
- [ ] CORS is not blocking production requests
- [ ] No critical errors in browser console or Render logs

---

## Troubleshooting

### Backend deploy fails

- Check Render **Logs** for the exact error
- Confirm `server/package.json` has `"start": "node server.js"` (added in Chore 13)
- Confirm every variable in your local `server/.env` is also in Render's Environment tab

### Backend deploys but `/api/test` returns 404

- Root Directory must be `server`, not the repo root
- Make sure you pushed your latest `server.js` to GitHub before deploying

### Frontend can't reach backend

- `VITE_API_URL` must be set in Render **before** the build runs (Vite inlines env vars at build time — if you add it after, click **Manual Deploy** → **Clear build cache & deploy**)
- No trailing slash on `VITE_API_URL`
- Check the Network tab — if requests go to `localhost:3001` in production, the env var is missing

### Database errors in production

- Use the Supabase **Transaction Pooler** URL (from Chore 14) — the direct connection string often fails on Render
- Verify `DATABASE_URL` in Render matches your local `.env` exactly, including the password
- Supabase free tier pauses inactive projects — open the Supabase dashboard to confirm yours is "Healthy"

### 404 on frontend routes after refresh

- For React Router on a static host, add a redirect rule in Render: **Redirects/Rewrites** → Source `/*`, Destination `/index.html`, Action `Rewrite`
