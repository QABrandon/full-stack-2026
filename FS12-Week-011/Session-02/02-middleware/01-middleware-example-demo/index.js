//index.js

const express = require("express");
const app = express();

// Middleware runs in the order you define it
console.log("1. Server starting...");

//First Middleware
app.use((req, res, next) => {
  console.log("2. First middleware - runs for ALL requests");
  // Real world example
  // Log to a dashboard that our endpoint was hit
  next();
});

//Second Middleware
app.use((req, res, next) => {
  console.log("3. Second middleware - also runs for ALL requests");
  next();
});

// Built-in middleware
app.use(express.json());

// Third middleware
app.use("/users", (req, res, next) => {
  console.log("4. Users middleware - only for /users routes");
  next();
});

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  console.log("5. Route handler - GET /users");
  res.json({ users });
});

app.post("/users", (req, res) => {
  console.log("5. Route handler - POST /users");
  console.log("Request body:", req.body);

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
