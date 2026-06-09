// Sequelize Authentication Server - COMPLETED
// User authentication with Sequelize, SQLite, and bcrypt

const express = require('express');
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Signup endpoint - creates a new user account
app.post('/signup', async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required'
      });
    }

    // Hash the password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({
      username: username,
      hashedPassword: hashedPassword
    });

    // Never send back the password!
    response.status(201).json({
      message: 'User created successfully',
      username: newUser.username,
      userId: newUser.id
    });

  } catch (error) {
    console.error('Signup error:', error);

    // This error fires when the unique username constraint fails
    if (error.name === 'SequelizeUniqueConstraintError') {
      return response.status(400).json({
        message: 'Username already exists'
      });
    }

    response.status(500).json({ message: 'Server error during signup' });
  }
});

// Login endpoint - verifies user credentials
app.post('/login', async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required'
      });
    }

    // Find the user in the database
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return response.status(401).json({
        message: 'Invalid username or password'
      });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return response.status(401).json({
        message: 'Invalid username or password'
      });
    }

    response.status(200).json({
      message: 'Login successful',
      username: user.username,
      userId: user.id
    });

  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ message: 'Server error during login' });
  }
});

// View all users - development only
app.get('/users', async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'createdAt']
    });

    response.json({
      message: 'Current users',
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).json({ message: 'Server error fetching users' });
  }
});

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  POST /signup');
    console.log('  POST /login');
    console.log('  GET  /users');
  });
});
