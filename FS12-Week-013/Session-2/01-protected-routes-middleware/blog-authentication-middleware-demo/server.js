// Protected Routes and Middleware Example - In-Memory Blog Application
// This demonstrates MVC architecture with proper folder structure

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Create Express application
const app = express();
const PORT = 3000;

// Middleware to enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', authRoutes);  // Authentication routes (register, login)
app.use('/', postRoutes);  // Post routes (CRUD operations)
app.use('/', userRoutes);  // User routes (profile, users list)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('\nOpen your browser and visit: http://localhost:${PORT}');
  console.log('\nProject Structure:');
  console.log('  middleware/auth.js - Authentication middleware');
  console.log('  models/User.js - User data model');
  console.log('  models/Post.js - Post data model');
  console.log('  controllers/authController.js - Authentication logic');
  console.log('  controllers/postController.js - Post CRUD logic');
  console.log('  controllers/userController.js - User profile logic');
  console.log('  routes/authRoutes.js - Authentication endpoints');
  console.log('  routes/postRoutes.js - Post endpoints');
  console.log('  routes/userRoutes.js - User endpoints');
  console.log('\nAPI Endpoints:');
  console.log('  Public Routes:');
  console.log('    POST /register - Create account');
  console.log('    POST /login - Login to account');
  console.log('    GET /posts - View all posts (no auth)');
  console.log('    GET /posts/:postId - View single post (no auth)');
  console.log('    GET /users - View all users (dev only)');
  console.log('\n  Protected Routes (require authentication):');
  console.log('    POST /posts - Create new post (auth required)');
  console.log('    GET /my-posts - View your posts (auth required)');
  console.log('    PUT /posts/:postId - Update your post (auth + ownership check)');
  console.log('    DELETE /posts/:postId - Delete your post (auth + ownership check)');
  console.log('    GET /profile - View your profile (auth required)');
  console.log('\nNote: Data is stored in memory and will be lost when server restarts');
});
