# Refactoring Express Routes with Controllers - Walkthrough Demo

## Learning Objectives
- Understand the MVC (Model-View-Controller) pattern in Express.js
- Separate routing logic from business logic
- Create organized route files using Express Router
- Implement controller functions for clean code architecture
- Apply the separation of concerns principle
- Build scalable and maintainable Express applications

---

## Why Refactor Routes and Controllers?

### Problems with Routes in Main File:
- ❌ All logic in one file becomes unmanageable
- ❌ Hard to find and maintain specific features
- ❌ Difficult to test individual functions
- ❌ No separation of concerns

### Benefits of Routes + Controllers Pattern:
- ✅ Organized, modular code structure
- ✅ Easy to locate and update features
- ✅ Testable, reusable functions
- ✅ Clear separation of routing and business logic
- ✅ Scalable architecture for large applications

---

## Step 1: Starting Point - Routes in Main File

### Current Structure (Not Ideal)
```
express-routes-simple-demo/
├── index.js          (Everything in one file!)
├── package.json
└── package-lock.json
```

### Current index.js (Before Refactoring)
```javascript
// Basic Routing Demo

const express = require("express");
const app = express();

//middleware which we will talk about in a bit
app.use(express.json());

//usually this data is in a Database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET All Users
app.get("/users", (req, res) => {
  // return back users and count in a new object
  res.json({
    users: users,
    count: users.length,
  });
});

// Practice -
// What would the route and code be for
// GET by user id to get an individual user
// app.get("/users/:id")

// DELETE START - remove resource
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({
    message: "User deleted",
    user: deletedUser,
  });
});
// DELETE END

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Problems:**
- Business logic (finding users, validation) mixed with routes
- Hard to test individual operations
- Difficult to reuse logic across routes

---

## Step 2: Create Organized Folder Structure

### Create the new structure
```bash
mkdir routes
mkdir controllers
```

### Target Structure (After Refactoring)
```
express-routes-controllers-demo/
├── index.js                      (Main server file - minimal code)
├── routes/
│   └── users.js                  (Route definitions only)
├── controllers/
│   └── usersController.js        (Business logic only)
├── package.json
└── package-lock.json
```

---

## Step 3: Extract Business Logic to Controller

### Create controllers/usersController.js
```javascript
// Sample data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users

const getAllUsers = (req, res) => {
  // return back users and count in a new object
  // when we visit localhost:3000/users
  // you can do this in Postman/browser/whatever tool
  res.json({
    users: users,
    count: users.length,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({
    message: "User deleted",
    user: deletedUser,
  });
};

module.exports = {
  getAllUsers,
  //   getUserById,
  //   createUser,
  //   updateUser,
  deleteUser,
};
```

**Key Improvements:**
- Each function has a single responsibility
- Functions are reusable and testable
- Business logic separated from routing

---

## Step 4: Create Route Definitions

### Create routes/users.js
```javascript
// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// Connect routes to controller methods
// every endpoint here will be prefixed with
// localhost:3000/users
router.get("/", userController.getAllUsers); // localhost:3000/users
// router.get("/:id", userController.getUserById); // localhost:3000/users/1
// router.post("/", userController.createUser); // localhost:3000/users
// router.put("/:id", userController.updateUser); // localhost:3000/users/1
router.delete("/:id", userController.deleteUser); // localhost:3000/users/1

module.exports = router;
```

**Key Points:**
- Routes are clean and declarative
- No business logic in route file
- Uses `express.Router()` for modular routing
- Routes reference controller functions
- Commented routes show what could be added later

---

## Step 5: Update Main Server File

### Update index.js (Minimal and Clean)
```javascript
// Routes + Controllers Demo

const express = require("express");
const app = express();
const userRoutes = require("./routes/users")

//middleware which we will talk about in a bit
app.use(express.json());

// get rid of the users implementation
// then we have to add our routes
app.use("/users", userRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Benefits:**
- Main file is now simple and readable
- Easy to add new route modules
- Clear middleware setup
- Centralized server configuration

---

## Step 6: Understanding the Flow

### Request Flow Diagram
```
Client Request
     ↓
index.js (app.use("/users", userRoutes))
     ↓
routes/users.js (router.get("/", ...))
     ↓
controllers/usersController.js (getAllUsers function)
     ↓
Response to Client
```

### Example: GET /users/1
1. Request hits server at `http://localhost:3000/users/1`
2. Main file (`index.js`) routes to `/users` prefix
3. Route file (`routes/users.js`) matches `/:id` pattern
4. Controller (`usersController.js`) executes `getUserById()`
5. Response sent back to client

---

## Step 7: Adding More Routes (Scalability)

### Easy to Add New Resources
```javascript
// index.js
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
```

### File Structure for Multiple Resources
```
express-app/
├── index.js
├── routes/
│   ├── users.js
│   ├── products.js
│   └── orders.js
├── controllers/
│   ├── usersController.js
│   ├── productsController.js
│   └── ordersController.js
└── package.json
```

---

## Testing the Refactored Application

### Start the server
```bash
npm run start
```

### Test with Postman or Browser

**Available endpoints:**
- GET `/users` - Get all users
- DELETE `/users/:id` - Delete user

### Test Sequence
1. GET `http://localhost:3000/users` - See Alice and Bob
2. DELETE `http://localhost:3000/users/1` - Delete Alice
3. GET `http://localhost:3000/users` - Verify Alice is gone

---

## Comparison: Before vs After

### Before (Monolithic)
```javascript
// index.js - Everything in one file
const express = require("express");
const app = express();

let users = [...];

app.get("/users", (req, res) => {
  // Business logic here
});

app.post("/users", (req, res) => {
  // Business logic here
});

// ... 50 more routes ...

app.listen(3000);
```

### After (Modular)
```javascript
// index.js - Clean and simple
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

app.use(express.json());
app.use("/users", userRoutes);

app.listen(3000);
```

```javascript
// routes/users.js - Route definitions only
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
// ...

module.exports = router;
```

```javascript
// controllers/usersController.js - Business logic only
const getAllUsers = (req, res) => {
  // Logic here
};

module.exports = { getAllUsers, ... };
```

---
