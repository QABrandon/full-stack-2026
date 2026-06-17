# Step 2 — Fix CORS

You saw the browser block the request in Step 1. Now make it work.

## What's happening

- Frontend = `http://localhost:5173`
- Backend = `http://localhost:3001`
- Different ports = **different origins** → browser blocks the fetch by default.
- The backend has to say "this origin is allowed." That's **CORS**.

---

## 1. Open `backend/server.js`

## 2. Add the import

At the top, under the other `require` lines:

```js
const cors = require("cors");
```

## 3. Enable CORS as middleware

Below `app.use(express.json());` add:

```js
app.use(cors()); // allows ALL origins — fine for local dev
```

Your top of file should now look like:

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
```

## 4. Save the file

If you launched the backend with the **debug → dev** option (or `nodemon`), it auto-restarts. Otherwise stop it (`Ctrl+C`) and start it again.

## 5. Refresh the browser

- Go to [http://localhost:5173](http://localhost:5173).
- The three seed todos load. ✅
- Open DevTools → **Console** → no more CORS error.
- Open DevTools → **Network** → click the `todos` request → **Response Headers** now include `Access-Control-Allow-Origin: *`.

## 6. Try every action

- Type a new todo → click **Add Todo** → it appears.
- Click the checkbox → it toggles.
- Click **Delete** → it disappears.

---

## Optional — lock CORS down to just your frontend

`app.use(cors())` allows **any** site to call your API. For production, restrict it:

```js
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};
app.use(cors(corsOptions));
```

This reads `FRONTEND_URL` from your `.env` file.

---

## Done

The frontend and backend are talking. Next: [step-3-debug-for-understanding.md](./step-3-debug-for-understanding.md) — trace one full request round-trip with the debugger.
