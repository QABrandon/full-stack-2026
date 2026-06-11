// Role-Based Authorization Example - In-Memory Blog Application
// Builds on the authentication-middleware example by adding:
//   1. A Role model (admin and author)
//   2. A roleId reference on every user (acts like a foreign key)
//   3. A requireRole middleware that protects routes by role
//   4. A seed step that creates starter roles and users on startup

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

// Import the seeder so we can populate starter data on boot
const seedDatabase = require('./seeds/seedData');

// Create Express application
const app = express();
// Default port is 3000 but you can override it with the PORT environment variable
// (handy when port 3000 is already in use by another project)
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', authRoutes);   // Register and login
app.use('/', postRoutes);   // Post CRUD
app.use('/', userRoutes);   // Profile, user listing, role assignment
app.use('/', roleRoutes);   // Role listing

// Start the server AFTER seeding data.
// seedDatabase is async (bcrypt is async) so we await it inside an async IIFE.
(async () => {
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('\nSeeded login credentials:');
    console.log('  admin  / admin123   (role: admin)');
    console.log('  alice  / alice123   (role: author)');
    console.log('\nAPI Endpoints:');
    console.log('  Public:');
    console.log('    POST /register          - Create account (defaults to author)');
    console.log('    POST /login             - Login to account');
    console.log('    GET  /posts             - View all posts');
    console.log('    GET  /posts/:postId     - View a single post');
    console.log('    GET  /roles             - List roles and their permissions');
    console.log('\n  Authenticated (any role):');
    console.log('    GET  /profile           - View your own profile');
    console.log('    GET  /my-posts          - View your own posts');
    console.log('\n  Authenticated (admin or author):');
    console.log('    POST   /posts           - Create a post');
    console.log('    PUT    /posts/:postId   - Update a post (admin: any, author: own)');
    console.log('    DELETE /posts/:postId   - Delete a post (admin: any, author: own)');
    console.log('\n  Authenticated (admin only):');
    console.log('    GET   /users                  - List all users');
    console.log('    PATCH /users/:userId/role     - Change a user\'s role');
    console.log('\nData is stored in memory. Restarting the server re-seeds everything.');
  });
})();
