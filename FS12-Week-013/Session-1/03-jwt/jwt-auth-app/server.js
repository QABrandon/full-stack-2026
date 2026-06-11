// Simple In-Memory JWT Authentication Example
// This demonstrates JWT token creation and verification with in-memory storage

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Secret key for signing JWTs (in production, use environment variable)
// Usually this would be in a .env file and not in the code directly
const JWT_SECRET = "your-secret-key-change-this-in-production";

// Store users in memory (this resets when server restarts)
const users = [];

// Middleware to enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

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

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user object with hashed password
    const newUser = {
      id: users.length + 1,
      username: username,
      hashedPassword: hashedPassword,
    };

    // Add the user to our in-memory storage
    users.push(newUser);

    // Send success response (no token yet - they need to login)
    response.status(201).json({
      message: "User created successfully",
      username: username,
    });
  } catch (error) {
    console.error("Signup error:", error);
    response.status(500).json({ message: "Server error during signup" });
  }
});

// Login endpoint - verifies credentials and returns a JWT token
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

    // Create JWT payload with user information
    const payload = {
      userId: user.id,
      username: user.username,
    };

    // Sign the JWT token with the secret key and set expiration
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h", //Token expires in 24 hours
    });

    // Send token to client
    response.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({ message: "Server error during login" });
  }
});

// Middleware function to verify JWT tokens
function authenticateToken(request, response, next) {
  // Get the Authorization header from the request
  const authHeader = request.headers.authorization;

  // Extract the token from "Bearer TOKEN" format
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token was provided
  if (!token) {
    return response.status(401).json({
      message: "Access token required",
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user data to the request object
    request.user = decoded;

    next();
  } catch (error) {
    // Handle different types of token errors
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return response.status(403).json({
        message: "Invalid token",
      });
    }

    // Generic error for any other issues
    return response.status(500).json({
      message: "Token verification failed",
    });
  }
}


// Protected route - requires valid JWT token
app.get("/profile", authenticateToken, (request, response) => {
  // If we get here, the token is valid and user data is in request.user
  response.json({
    message: "Access granted to protected route",
    user: {
      userId: request.user.userId,
      username: request.user.username,
    },
  });
});

// Another protected route example
app.get("/dashboard", authenticateToken, (request, response) => {
  response.json({
    message: "Welcome to your dashboard",
    username: request.user.username,
    data: "This is protected data only accessible with a valid token",
  });
});

// Test endpoint to see all users (FOR DEVELOPMENT ONLY)
app.get("/users", (request, response) => {
  // Show usernames only
  const usernames = users.map((user) => ({
    id: user.id,
    username: user.username,
  }));

  response.json({
    message: "Current users",
    users: usernames,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`\nOpen your browser and visit: http://localhost:${PORT}`);
  console.log("\nAPI Endpoints:");
  console.log("  POST /signup - Create a new user");
  console.log("  POST /login - Login and receive JWT token");
  console.log("  GET /profile - Access protected route (requires token)");
  console.log("  GET /dashboard - Another protected route (requires token)");
  console.log("  GET /users - View all usernames");
});

