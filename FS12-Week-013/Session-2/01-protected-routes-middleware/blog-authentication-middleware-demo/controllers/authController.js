// Authentication Controller
// This file handles authentication logic (register and login)

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Register a new user
async function register(request, response) {
  try {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

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

    // Create new user
    const newUser = User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response without password
    response.status(201).json({
      message: 'Registration successful',
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

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
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
