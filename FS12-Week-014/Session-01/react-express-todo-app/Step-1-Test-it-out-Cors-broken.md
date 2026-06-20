# React + Express Todo — See It Break (CORS Demo)

This repo intentionally ships **without CORS** so you can see the browser block the request.

##Run the steps in the README.md before moving on

Open [http://localhost:5173](http://localhost:5173) → page shows **"Failed to fetch todos"**. Open DevTools Console (`F12`) to see the **CORS error**.

## Watch it break (this is the lesson!)

You should see **"Error: Failed to fetch todos"** on the page.

Open the browser DevTools (`F12` or right-click → `Inspect`) → **Console** tab. You'll see something like:

> `Access to fetch at 'http://localhost:3001/api/todos' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

### What's happening?

- The **frontend** is running on `http://localhost:5173`.
- The **backend** is running on `http://localhost:3001`.
- These are **different origins** (different ports = different origins to the browser).
- By default, the browser **blocks** requests from one origin to another for security. This is called the **Same-Origin Policy**.
- The backend has to **explicitly say** "yes, this other origin is allowed to talk to me." That's what CORS (Cross-Origin Resource Sharing) does.

> **Pause and observe:** if you visit [http://localhost:3001/api/todos](http://localhost:3001/api/todos) directly in the browser, it **works** — because you're not crossing origins. The block only happens when **JavaScript on one origin** tries to fetch from **another origin**.

---
