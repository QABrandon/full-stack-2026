// Simple In-Memory Authentication Example
// This demonstrates basic password hashing with bcrypt

const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Store users in memory (this resets when server restarts)
const users = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Signup endpoint - creates a new user account
app.post("/signup", async (request, response) => {
  try {
    // Get the username and password from the request body
    const username = request.body.username;
    const password = request.body.password;

    // Check if username and password were provided
    if (!username || !password) {
      return response.status(400).json({
        message: "Username and password are required",
      });
    }

    // Check if username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return response.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash the password with bcrypt (10 is the salt rounds)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user object with hashed password
    const newUser = {
      username: username,
      hashedPassword: hashedPassword,
    };

    // Add the user to our in-memory storage
    users.push(newUser);

    console.log("user data: ", newUser);

    // Send success response (never send back the password!)
    response.status(201).json({
      message: "User created successfully",
      username: username,
    });
  } catch (error) {
    console.error("Signup error:", error);
    response.status(500).json({ message: "Server error during signup" });
  }
});

// Login endpoint - verifies user credentials
app.post("/login", async (request, response) => {
  try {
    // Get the username and password from the request body
    const username = request.body.username;
    const password = request.body.password;

    // Check if username and password were provided
    if (!username || !password) {
      return response.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find the user in our in-memory storage
    const user = users.find((user) => user.username === username);
    if (!user) {
      return response.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return response.status(401).json({
        message: "Invalid username or password",
      });
    }

    // If we get here, login was successful
    response.status(200).json({
      message: "Login successful",
      username: username,
    });
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({ message: "Server error during login" });
  }
});

// Test endpoint to see all users (FOR DEVELOPMENT ONLY - never do this in production!)
app.get("/users", (request, response) => {
  // Show usernames only, never expose passwords
  const usernames = users.map((user) => user.username);
  response.json({
    message: "Current users",
    usernames: usernames,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Try these endpoints:");
  console.log("  POST /signup - Create a new user");
  console.log("  POST /login - Login with existing user");
  console.log("  GET /users - View all usernames");
});
