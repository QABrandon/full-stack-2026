# Full Stack Integration Walkthrough (Frontend + Backend)

A step-by-step guide to building a monorepo with a **React (Vite) frontend** and an **Express backend**, then connecting them together. We will intentionally **leave CORS out at first** so you can see the browser block the request — then fix it. That moment of "ohhh, that's why CORS exists" is the whole point of this walkthrough.

---

## What you will build

```
react-express-todo-app/         <-- monorepo root
├── .gitignore
├── backend/                    <-- Express API (port 3001)
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/                   <-- React + Vite (port 5173)
    ├── package.json
    └── src/
        ├── App.jsx
        └── components/
            ├── TodoList.jsx
            └── TodoList.css
```

> **Monorepo** = one repository (one folder) that holds **multiple projects**. Here, two: `backend/` and `frontend/`. Each has its **own** `package.json` and `node_modules/`.

---

## Before you start — quick checks

Open your terminal and run:

```bash
node -v     # should print v18 or higher
npm -v      # should print 9 or higher
```

> **Don't have Node?** Install it from [nodejs.org](https://nodejs.org/) (LTS version).

---

## Step 1 — Create the monorepo folder

You can do this either way:

**Terminal:**
```bash
mkdir react-express-todo-app
cd react-express-todo-app
```

**VS Code:**
- `File` → `Open Folder…` → pick the parent location → click `New Folder` → name it `react-express-todo-app` → `Open`.

> **Double-check:** Your VS Code title bar should show `react-express-todo-app` and the Explorer panel on the left should be empty.

---

## Step 2 — Create the two subfolders

**Terminal (from inside `react-express-todo-app`):**
```bash
mkdir backend frontend
```

**VS Code:**
- In the Explorer panel, hover over the project name → click the **New Folder** icon → name it `backend`.
- Repeat for `frontend`.

> **Double-check:** Run `ls` (Mac/Linux) or `dir` (Windows). You should see exactly two folders: `backend` and `frontend`.

---

## Step 3 — Open the terminal and navigate to `backend`

In VS Code: `View` → `Terminal` (or `` Ctrl+` ``).

```bash
cd backend
pwd        # should end in /react-express-todo-app/backend
```

> **Why `cd` matters:** every `npm install` you run installs into the folder you're **currently in**. If you `npm install express` from the root by accident, you'll get a stray `node_modules/` at the root. If that happens, delete it and run the command again from inside `backend`.

---

## Step 4 — Initialize the backend `package.json`

```bash
npm init -y
```

> **What this does:** creates a `package.json` file with default values. The `-y` means "yes to all defaults" so it doesn't ask you questions.

> **Double-check:** A `package.json` file should now exist inside `backend/`. Open it — you'll see fields like `"name": "backend"`, `"version": "1.0.0"`, etc.

---

## Step 5 — Install backend dependencies

Still inside `backend/`:

```bash
npm install express cors dotenv
npm install -D nodemon
```

> **What each one does:**
> - `express` — the web server framework
> - `cors` — middleware to allow cross-origin requests (we'll use this later, **on purpose**)
> - `dotenv` — loads variables from a `.env` file into `process.env`
> - `nodemon` — auto-restarts the server when you save a file. The `-D` flag installs it as a **dev dependency** (not needed in production)

> **Double-check:**
> - A `node_modules/` folder appeared inside `backend/`.
> - A `package-lock.json` file appeared.
> - Open `package.json` — you should see all four packages listed under `dependencies` / `devDependencies`.

---

## Step 6 — Create `server.js` (intentionally **without** CORS)

Inside `backend/`, create a new file called `server.js`.

**Terminal:**
```bash
touch server.js
```

**VS Code:** right-click `backend/` in the Explorer → `New File` → name it `server.js`.

Paste this in. **Notice there is NO `cors` import or `app.use(cors())` line — that is on purpose.**

```js
// Load environment variables first
require("dotenv").config();
// Import required packages
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory todo storage
let todos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Learn Express", completed: false },
  { id: 3, text: "Build a full stack app", completed: false },
];

// Get all todos
// test by visiting http://localhost:3001/api/todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Get single todo by ID
app.get("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Add new todo
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle todo completion
app.put("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== todoId);

  if (todos.length < initialLength) {
    res.json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
```

---

## Step 7 — Create `.env.example` and `.env`

`.env.example` is the **template** that gets committed to git (so teammates know what variables are needed). `.env` is your **real** file (with secrets) and is **never** committed.

**Inside `backend/`, create `.env.example`:**

```
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
POSTGRES_DB=<postgres://add-connection-string-here>
```

**Then copy it to `.env`:**

**Terminal:**
```bash
cp .env.example .env
```

**VS Code:** right-click `.env.example` → `Copy` → right-click `backend/` → `Paste` → rename the copy to `.env`.

> **Double-check:** Both files exist inside `backend/`. They have the same contents for now — that's fine. In a real project, `.env` would have your actual database connection string.

---

## Step 8 — Update the `package.json` scripts

Open `backend/package.json` and replace it with this:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "dev": "node server.js",
    "nodemon": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

> **What changed:**
> - `"main"` now points to `server.js` (was `index.js` by default).
> - We added two scripts: `dev` (one-time run) and `nodemon` (auto-restart on save).

> **Heads up on versions:** the version numbers above are what we're using today. Yours may be slightly different from `npm install` — that's fine, leave them.

---

## Step 9 — Create the `.gitignore` at the **root** of the monorepo

Go back to the root of your monorepo (one level above `backend/`):

```bash
cd ..
```

Create a file called `.gitignore` (yes, the dot in front matters):

**Terminal:**
```bash
touch .gitignore
```

**VS Code:** right-click the root folder → `New File` → name it `.gitignore`.

Paste in:

```
node_modules
.env
```

> **Why at the root and not inside `backend/`?** Because the same rules apply to both `backend/` AND `frontend/`. One `.gitignore` at the root covers everything.

> **Double-check:** In the VS Code Explorer, `node_modules/` should appear **greyed out** — that's the visual confirmation it's being ignored.

---

## Step 10 — Start the backend and verify it works

From inside `backend/`:

```bash
cd backend
npm run nodemon
```

You should see:

```
Server running on http://localhost:3001
Environment: development
```

> **Test it in the browser:** open [http://localhost:3001/api/todos](http://localhost:3001/api/todos). You should see the JSON array of three todos.

> **Common gotchas:**
> - `Cannot find module 'express'` → you ran `npm install` in the wrong folder. `cd backend` and run it again.
> - `EADDRINUSE: port 3001` → another process is using that port. Either close it, or change `PORT` in your `.env`.
> - The terminal hangs with no output → that's normal! The server is **running**. Open a **second** terminal tab to do other work. Press `Ctrl+C` to stop it.

---

## Step 11 — Set up the React frontend

Open a **second** terminal tab (keep the backend running in the first one).

From the **monorepo root**:

```bash
cd frontend
npm create vite@latest .
```

> **The `.` at the end means "use the current folder"** instead of creating a new subfolder.

When prompted:
- **Package name:** `frontend`
- **Framework:** `React`
- **Variant:** `JavaScript` (or TypeScript if your class is using it)

Then install dependencies:

```bash
Y or Enter to have it auto install
```

> **Double-check:**
> - `frontend/package.json` exists with `react`, `react-dom`, and `vite` as dependencies.
> - `frontend/src/App.jsx` exists.
> - `frontend/node_modules/` exists.

---

## Step 12 — Replace the React starter with the todo UI

### `frontend/src/App.jsx`

Replace the contents with:

```jsx
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Full Stack Todo App</h1>
        <p>React Frontend + Express Backend</p>
      </header>

      <main>
        <TodoList />
      </main>

      <footer className="app-footer">
        <p>Connecting React to Express Demo</p>
      </footer>
    </div>
  );
}

export default App;
```

### `frontend/src/components/TodoList.jsx`

Create the folder `frontend/src/components/` and inside it create `TodoList.jsx`:

```jsx
import { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:3001/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          setError("Did you go to a new terminal in the \"backend\" folder and start the server using npm run nodemon?");
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
        setNewTodo("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const toggleTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      })
      .catch((err) => console.error("Error toggling todo:", err));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((t) => t.id !== id)))
      .catch((err) => console.error("Error deleting todo:", err));
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchTodos}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-input-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">Add Todo</button>
      </div>

      <div className="todos">
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className={todo.completed ? "todo-text completed" : "todo-text"}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>
          Total: {todos.length} | Completed: {todos.filter((t) => t.completed).length}
        </p>
      </div>
    </div>
  );
}

export default TodoList;
```

Also create an empty `TodoList.css` next to it (you can style later).

---

## Step 13 — Run the frontend

From inside `frontend/`:

```bash
npm run dev
```

You should see:

```
  VITE v7.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Troubleshooting cheat sheet

| Symptom | Likely cause | Fix |
|---|---|---|
| `Cannot find module 'express'` | Installed in wrong folder | `cd backend && npm install` |
| Port `3001` already in use | A server is already running | Kill it, or change `PORT` in `.env` |
| Frontend shows "Failed to fetch" | Backend is not running OR CORS not set | Start backend; add `app.use(cors())` |
| Todos disappear on backend restart | They're in-memory by design | Add a database (next module) |
| `node_modules` showing in git | `.gitignore` not at the right level | Put it at the **monorepo root** |
| `.env` accidentally committed | Same as above | Add to `.gitignore`, then `git rm --cached .env` |
