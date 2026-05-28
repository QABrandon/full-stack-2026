# Express Routing Basics - Walkthrough Demo

## Learning Objectives
- Understand Express.js routing fundamentals
- Create routes with different HTTP methods (GET, POST, PUT, DELETE)
- Work with URL parameters to access dynamic data
- Handle request and response objects
- Implement basic CRUD operations with in-memory data
- Test API endpoints using Postman or browser

---

## Setup

```bash
mkdir express-routes-simple-demo
cd express-routes-simple-demo
npm init
```

Press ENTER through all prompts, then type "yes" at the end to confirm.

```bash
npm install express
npm install -D nodemon
```

Update package.json scripts section to:
```json
{
  "scripts": {
    "start": "nodemon index.js"
  }
}
```

---

## Step 1: Basic Express Server with In-Memory Data

### Create index.js
```javascript
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample in-memory data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Test the server:**
```bash
npm run start
```

---

## Step 2: GET Route - Fetch All Users

### Add GET /users endpoint
```javascript
// GET All Users
app.get("/users", (req, res) => {
  // Return users and count
  res.json({
    users: users,
    count: users.length,
  });
});
```

**Test in browser:**
```
http://localhost:3000/users
```

**Expected response:**
```json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "count": 2
}
```

---

## Step 3: Practice Exercise - GET by ID

**Practice Question:**
What would the route and code be for GET by user id to get an individual user?

Hint: `app.get("/users/:id")`

---

## Step 4: DELETE Route - Remove User

### Add DELETE /users/:id endpoint
```javascript
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
```

**Test with Postman:**
- Method: DELETE
- URL: `http://localhost:3000/users/1`

**Expected response:**
```json
{
  "message": "User deleted",
  "user": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

---

## Complete Code (index.js)

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
  // when we visit localhost:3000/users
  // you can do this in Postman/browser/whatever tool
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

---

## Testing Workflow

### 1. Start the server
```bash
npm run start
```

### 2. Test with Browser (GET requests only)
- http://localhost:3000/users

### 3. Test with Postman

**Test sequence:**
1. GET `/users` - See initial Alice and Bob
2. DELETE `/users/1` - Delete Alice
3. GET `/users` - Verify Alice is gone

---