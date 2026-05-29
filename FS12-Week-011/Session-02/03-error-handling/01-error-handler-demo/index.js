const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Built-in middleware
app.use(express.json());

// Sample users data
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
let nextId = 3;

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Error Handler Demo - Users API",
    endpoints: [
      "GET /users - Get all users",
      "POST /users - Create user (requires name)",
      "Try creating duplicate names to see 500 error",
    ],
  });
});

// GET /users - Get all users
app.get("/users", (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
});

// POST /users - Create new user (with validation and duplicate error)
app.post("/users", (req, res, next) => {
  try {
    const { name } = req.body;

    // 400 error - Bad request validation
    if (!name) {
      const error = new Error("Name is Required");
      error.statusCode = 400;
      return next(error);
    }

    // check length of name is at least 2 characters
    if (name.length < 2) {
      const error = new Error("Name must be at least 2 characters");
      error.statusCode = 400;
      return next(error);
    }

    // This will cause a 500 error because we're not handling duplicates properly
    const existingUser = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    // Intentionally cause 500 error by accessing property without checking if user exists
    if (existingUser) {
      // This will cause a TypeError because we're trying to access a property that doesn't exist
      console.log(existingUser.nonExistentProperty.shouldCrash);
    }

    const newUser = {
      id: nextId++,
      name: name,
    };

    users.push(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(3600, () => {
  console.log("Server running on port 3600");
  console.log("\nAPI Documentation: http://localhost:3600/");
  console.log("Test endpoints:");
  console.log("  GET  http://localhost:3600/users");
  console.log("  POST http://localhost:3600/users");
});
