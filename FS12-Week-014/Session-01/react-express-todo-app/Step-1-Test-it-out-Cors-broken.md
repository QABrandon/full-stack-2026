# React + Express Todo — See It Break (CORS Demo)

This repo intentionally ships **without CORS** so you can see the browser block the request.

## commit — frontend + broken cors

- grab the monorepo folder
- `cd` into `backend` from terminal
- run the following:
  ```bash
  npm install
  ```
- `cd` to the `frontend` folder
- run the following:
  ```bash
  npm install
  ```
- from the `frontend` folder in terminal run:
  ```bash
  npm run dev
  ```
- In VSCode open `backend/package.json` and click the **debug launch** button. Choose `dev`.
- You will then see a **JavaScript Debug Terminal** launch.
- You should now have two running terminals — one running your frontend, the other the backend.

Open [http://localhost:5173](http://localhost:5173) → page shows **"Failed to fetch todos"**. Open DevTools Console (`F12`) to see the **CORS error**. Fix it by following [step-by-step-walkthrough.md](./step-by-step-walkthrough.md) Step 15.
