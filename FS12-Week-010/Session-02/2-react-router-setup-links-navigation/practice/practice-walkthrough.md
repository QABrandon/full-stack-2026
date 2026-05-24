# React Router Practice Walkthrough

A small app to practice the basics of React Router: setup, routes, pages, nav, `Link`, `useParams`, and `useNavigate`.

By the end you'll have:

```
practice-router-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── AboutPage.jsx
│       └── UserPage.jsx
```

Routes: `/`, `/about`, `/user/:userId`.

---

## Step 1 — Create the Vite app

From wherever you keep practice projects:

```bash
npm create vite@latest practice-router-app -- --template react
cd practice-router-app
npm install
```

Sanity check:

```bash
npm run dev
```

Open the localhost URL it prints. You should see the default Vite + React starter page. Stop the server with `Ctrl+C`.

---

## Step 2 — Install React Router

```bash
npm install react-router
```

> Using `react-router` v7 (the package was renamed from `react-router-dom`). If your install gives you v6 docs/imports, that's fine too — just import from `react-router-dom` instead.

---

## Step 3 — Wrap the app in `BrowserRouter`

Open `src/main.jsx` and add the import + wrapper:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

> `BrowserRouter` is what makes routing work. Anything inside it can use router stuff (`Routes`, `Link`, `useParams`, etc).

---

## Step 4 — Add `Routes` + `Route` with inline JSX

Replace the contents of `src/App.jsx` with something dead simple. We're not making files for the pages yet — we want to see routing work with **hard-coded JSX first**, then refactor.

```jsx
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  );
}

export default App;
```

Run the app:

```bash
npm run dev
```

Open `/` — you see "Home". Manually change the URL to `/about` — you see "About". That's routing.

> Don't refresh `/about` without doing this whole walkthrough — for dev it works because Vite handles it. The interesting failure modes for that come later when you deploy.

---

## Step 5 — Move the JSX into page components

Make a folder `src/pages/` and create two files:

**`src/pages/HomePage.jsx`**

```jsx
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome! Pick a route from the nav.</p>
    </div>
  );
}
```

**`src/pages/AboutPage.jsx`**

```jsx
export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a tiny app to practice React Router.</p>
    </div>
  );
}
```

Now update `App.jsx` to use them:

```jsx
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
```

Refresh — same result, but cleaner. This is the pattern we'll always use: one file per page in `pages/`.

---

## Step 6 — Add a `Header` (with nav) and a `Footer`

Make a folder `src/components/` and add two files. The header holds our nav links.

**`src/components/Header.jsx`**

```jsx
import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <h2>My Router Practice</h2>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/about">About</Link>
        {" | "}
        <Link to="/user/1">User 1</Link>
        {" | "}
        <Link to="/user/2">User 2</Link>
      </nav>
    </header>
  );
}
```

> Use `<Link to="...">`, not `<a href="...">`. An `<a>` would do a full page reload (your whole app re-downloads). `<Link>` swaps the route client-side — fast, no reload.

**`src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer>
      <small>© Router Practice App</small>
    </footer>
  );
}
```

Drop them into `App.jsx` around the `Routes`:

```jsx
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
```

> Header and Footer are **outside** of `<Routes>` on purpose — they show on every page. Only the part **inside** `<Routes>` changes when the URL changes.

Click around — Home, About. The header and footer stay put, only the middle swaps.

---

## Step 7 — A dynamic route with `useParams`

Add a third page that reads an ID from the URL.

**`src/pages/UserPage.jsx`**

```jsx
import { useParams } from "react-router";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing user ID: {userId}</p>
    </div>
  );
}
```

Register the route in `App.jsx` — note the `:userId` syntax:

```jsx
<Route path="/user/:userId" element={<UserPage />} />
```

Click "User 1" or "User 2" in the nav. The URL becomes `/user/1` or `/user/2`, and the page reads it via `useParams()`.

> `:userId` in the path is a **placeholder**. Whatever's in that slot of the URL becomes `params.userId`. `/user/abc` → `userId = "abc"`. It's always a string.

---

## Step 8 — Programmatic navigation with `useNavigate`

`<Link>` is for "user clicks a link." For "user clicks a button" or "after a form submits, send them somewhere" — use `useNavigate`.

Update `HomePage.jsx`:

```jsx
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome! Pick a route from the nav, or jump to a user.</p>
      <button onClick={() => navigate("/user/42")}>
        Go to user 42
      </button>
    </div>
  );
}
```

And add a back button on the user page:

```jsx
import { useParams, useNavigate } from "react-router";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing user ID: {userId}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
```

> `navigate("/some/path")` sends you there. `navigate(-1)` is the same as the browser back button.

---

## Step 9 — Sprinkle in a little CSS (optional)

Open `src/App.css` and replace whatever's there:

```css
header,
footer {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

footer {
  border-top: 1px solid #ddd;
  border-bottom: none;
  margin-top: 2rem;
}

nav a {
  margin-right: 0.5rem;
}

main {
  padding: 1rem;
}
```

---

## Try it

With `npm run dev` running:

- `/` shows Home, with a "Go to user 42" button → click it → ends up at `/user/42`.
- Hit "Go Back" → returns to Home.
- Click any `User N` link in the header → the ID changes in the page.
- Type a path that doesn't exist (`/whatever`) → you get a blank middle area. We'll add a 404 route next time.

---