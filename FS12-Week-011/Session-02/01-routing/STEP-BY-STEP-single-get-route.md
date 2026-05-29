# From One GET Route to Routes + Controllers (Step by Step)

This guide takes a **single GET route** living inside `index.js` and refactors it
into the routes + controllers pattern **one small step at a time**. After every
step the app still runs exactly the same — we never break it, we just keep moving
code to a better home.

> The goal isn't to memorize a folder layout. It's to *feel why* each move makes
> the code easier to read, test, and grow.

## Learning Objectives
- Start from a single working route and refactor it without breaking anything
- Understand the difference between a **route** (the address) and a **controller** (the work)
- Use `express.Router()` to group routes for one resource
- Mount a router in the main server file with `app.use()`
- See why this pattern scales when you add a second, third, and tenth route

---

## The Big Picture (read this first)

Right now one route does three jobs at once:

1. **Defines the address** — `GET /users`
2. **Does the work** — find the data, build the response
3. **Lives in the server file** — mixed in with `app.listen`, middleware, etc.

We're going to split those jobs apart. The end state:

```
Client → index.js → routes/users.js → controllers/usersController.js → Response
         (server)    (the address)      (the work)
```

We'll get there in **5 small steps**, testing after each one.

---

## Step 0: The Starting Point - copy 01-express-routes-simple-demo to a simple-demo-refactor folder

A single GET route, everything inline in `index.js`:

```javascript
// index.js
const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
];

// One route, doing everything inline
app.get("/users", (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Test it:**
```bash
npm run start
```
Visit `http://localhost:3000/users` → you should see Alice and Bob.

This works! It's just not organized. Let's keep this behavior and slowly improve the structure.

---

## Step 1: Give the Handler a Name

The function inside `app.get(...)` is **anonymous** — it has no name and is wired
directly to the route. First move: pull it out into a **named function** that
still lives in `index.js`.

```javascript
// index.js
const express =   { id: 2, name: "Bob", email: "bob@example.com" },
require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// 1. The work now has a name
const getAllUsers = (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
};

// 2. The route just points at it
app.get("/users", getAllUsers);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**What changed:** The route line `app.get("/users", getAllUsers)` now reads like a
sentence — *"on GET /users, run getAllUsers."* The address and the work are
mentally separated, even though they're still in the same file.

**Test it again:** `http://localhost:3000/users` → still Alice and Bob. Nothing broke. ✅

> This is the whole trick of refactoring: small move, re-test, repeat.

---

## Step 2: Move the Work into a Controller

A **controller** is just a file that holds those handler functions. Let's move
`getAllUsers` (and the data it needs) into its own file.

Create the folder and file:
```bash
mkdir controllers
```

```javascript
// controllers/usersController.js

// The data moves with the function that uses it
// (in a real app this would come from a database)
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const getAllUsers = (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
};

// Export it so other files can use it
module.exports = {
  getAllUsers,
};
```

Now `index.js` imports the function instead of defining it:

```javascript
// index.js
const express = require("express");
const app = express();
const usersController = require("./controllers/usersController"); // 1. import

app.use(express.json());

// 2. route points at the imported function
app.get("/users", usersController.getAllUsers);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**What changed:** The "work" left `index.js` entirely. `index.js` no longer knows
*how* users are fetched — it only knows *who* handles the route. That's
**separation of concerns**.

**Test it again:** `http://localhost:3000/users` → still works. ✅

---

## Step 3: Create a Router for the Route

Right now `index.js` still defines the address (`app.get("/users", ...)`). As an
app grows you get dozens of these and the server file becomes a wall of routes.
Express gives us `express.Router()` to group all routes for **one resource** (here:
users) into their own file.

```bash
mkdir routes
```

```javascript
// routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Note the path is "/" not "/users" — we'll explain why in Step 4
router.get("/", usersController.getAllUsers);

module.exports = router;
```

We haven't touched `index.js` yet — this file isn't connected to anything. If you
test now, `/users` will 404 because the old route is about to be replaced. Let's
connect it in the next step.

---

## Step 4: Mount the Router in index.js

Replace the individual route with the whole router:

```javascript
// index.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/users"); // 1. import the router

app.use(express.json());

// 2. Mount it. Every route in routes/users.js is now
//    prefixed with /users
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**The key idea — where does the `/users` come from?**

The full URL is built in **two pieces**:

| File | Defines | Piece |
|------|---------|-------|
| `index.js` | `app.use("/users", userRoutes)` | `/users` |
| `routes/users.js` | `router.get("/", ...)` | `/` |

Stick them together → `GET /users`. That's why the router used `"/"` and not
`"/users"` — the prefix is added when it's mounted. This is what lets you change
the prefix in one place without editing every route.

**Test it again:** `http://localhost:3000/users` → still Alice and Bob. ✅

We started and ended with the exact same behavior — but the code is now organized.

---

## Step 5: Prove It Scales — Add a Second Route

This is the payoff. Adding `GET /users/:id` (get one user by id) now touches only
two files, and never the server file.

**1. Add the work in the controller:**
```javascript
// controllers/usersController.js
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const getAllUsers = (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
};

// NEW: get one user by id
const getUserById = (req, res) => {
  const { id } = req.params;
  // parseInt because params are strings, but our ids are numbers
  const foundUser = users.find((user) => user.id === parseInt(id));

  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user: foundUser });
};

module.exports = {
  getAllUsers,
  getUserById, // export the new one
};
```

**2. Add the address in the router:**
```javascript
// routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);    // GET /users
router.get("/:id", usersController.getUserById); // GET /users/1

module.exports = router;
```

**3. `index.js` — change nothing.** That's the whole point. ✅

**Test it:**
- `http://localhost:3000/users` → all users
- `http://localhost:3000/users/1` → just Alice
- `http://localhost:3000/users/999` → `{ "error": "User not found" }`

---

## Final Structure

```
02-express-routes-controllers-demo/
├── index.js                      (server setup + mounting routers — short!)
├── routes/
│   └── users.js                  (addresses only)
├── controllers/
│   └── usersController.js         (the work only)
├── package.json
└── package-lock.json
```

---

## What We Learned

| Job | Before | After |
|-----|--------|-------|
| Server setup | `index.js` | `index.js` |
| Define the address | `index.js` | `routes/users.js` |
| Do the work | `index.js` | `controllers/usersController.js` |

- A **route** says *where* (the URL + method). A **controller** says *what to do*.
- The URL is assembled from the mount prefix (`app.use`) + the router path.
- Adding routes for users never touches `index.js` again.
- Need a `products` resource? Add `routes/products.js` + `controllers/productsController.js`
  and one `app.use("/products", productRoutes)` line. The pattern repeats.
- We refactored in 5 small steps and **tested after every one** — the behavior
  never changed, only the structure.

---

## Try It Yourself

1. Add a `POST /users` route that adds a new user to the array.
   - Controller: read `req.body`, push a new user, return it with `res.status(201)`.
   - Router: `router.post("/", usersController.createUser);`
   - Notice: you still don't touch `index.js`.
2. Add a `DELETE /users/:id` route (hint: `findIndex` + `splice`).
3. Bonus: create a brand-new `products` resource with its own route + controller files.
