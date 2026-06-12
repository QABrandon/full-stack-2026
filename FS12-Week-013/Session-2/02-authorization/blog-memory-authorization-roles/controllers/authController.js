// Authentication Controller
// This file handles authentication logic (register and login).
// Role data is included in the JWT so the authorize middleware can read
// it on every request without another database lookup.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Helper to build the JWT payload in one place.
// Storing roleId and roleName in the token means authorize middleware
// can check the role WITHOUT reading the database on every request.
function buildTokenPayload(user) {
  const role = Role.findById(user.roleId);

  return {
    userId: user.id,
    username: user.username,
    roleId: user.roleId,
    roleName: role ? role.name : 'unknown'
  };
}

// Register a new user
async function register(request, response) {
  try {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    // NOTE: we deliberately do NOT let users pick any role they want during
    // registration. Allowing that would break the whole point of roles.
    // Everyone registers as an "author" by default. An admin must promote
    // them to admin later using PATCH /users/:id/role.

    // Validate input
    if (!username || !email || !password) {
      return response.status(400).json({
        error: 'All fields are required'
      });
    }

    // Check if user already exists
    const existingUser = User.findByUsernameOrEmail(username, email);

    if (existingUser) {
      return response.status(400).json({
        error: 'Username or email already exists'
      });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Look up the default "author" role so new users can post right away
    // but cannot manage other users or delete other people's posts.
    const authorRole = Role.findByName('author');

    // Create new user with the author role
    const newUser = User.create({
      username: username,
      email: email,
      password: hashedPassword,
      roleId: authorRole.id
    });

    // Create JWT token with role info baked in
    const token = jwt.sign(
      buildTokenPayload(newUser),
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response without password
    response.status(201).json({
      message: 'Registration successful. You have been assigned the author role.',
      token: token,
      user: User.getSafeUser(newUser)
    });

  } catch (error) {
    console.error('Registration error:', error);
    response.status(500).json({ error: 'Registration failed' });
  }
}

// Login an existing user
async function login(request, response) {
  try {
    const username = request.body.username;
    const password = request.body.password;

    // Validate input
    if (!username || !password) {
      return response.status(400).json({
        error: 'Username and password are required'
      });
    }

    // Find user by username
    const user = User.findByUsername(username);

    if (!user) {
      // Return generic error to prevent username enumeration
      return response.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Return generic error to prevent username enumeration
      return response.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Create JWT token with role info baked in
    const token = jwt.sign(
      buildTokenPayload(user),
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response without password
    response.json({
      message: 'Login successful',
      token: token,
      user: User.getSafeUser(user)
    });

  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ error: 'Login failed' });
  }
}

// Export controller functions
module.exports = {
  register,
  login
};
