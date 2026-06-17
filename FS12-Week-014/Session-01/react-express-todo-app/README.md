## How to start and use the react-express-todo-app monorepo

## Only needed once to initialize

1. in both the the backend and frontend folders run

```
npm install
```

2. both the backend and frontend folders will have their own node_modules folders now

## To start the full stack application

1. open 2 terminals from the root of this folder
2. in the first run the following commands:

```
cd backend
npm run nodemon
```

3. in the second run the following commands:

```
cd frontend
npm run dev
```

4.  You should now have **two running terminals** — one for the frontend (port 5173) and one for the backend (port 3001).
    You can now visit [http://localhost:5173](http://localhost:5173) and see the app running

## How to start the backend for debugging

Open a **new terminal** and `cd` into `backend` before starting. The server will not start if you run these from the wrong folder.

**Option A — Terminal:**

```bash
cd backend
npm run nodemon
```

You should see: `Server running on http://localhost:3001`

**Option B — VS Code Debug Launch (attaches a real debugger):**

- In VS Code, open `backend/package.json`.
- Click the **▶ debug launch** button that appears above the `"scripts"` section.
- Choose `dev`.
- A **JavaScript Debug Terminal** opens and the server starts.
