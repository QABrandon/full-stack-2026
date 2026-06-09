// Sequelize Authentication Server - STARTER
// Complete the TODOs below to finish the authentication endpoints

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

    // Check if username and password were provided
    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required'
      });
    }

    // TODO 2: Hash the password using bcrypt
    // Hint: const hashedPassword = await bcrypt.hash(password, 10);


    // TODO 3: Create the new user in the database
    // Hint: const newUser = await User.create({ username, hashedPassword });


    // TODO 4: Send a success response with status 201
    // Include the message, username, and userId (newUser.id)


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

    // TODO 5: Find the user in the database by username
    // Hint: const user = await User.findOne({ where: { username } });


    // TODO 6: If no user was found, send a 401 response
    // Use the message "Invalid username or password"


    // TODO 7: Compare the provided password to the stored hashed password
    // Hint: const passwordMatch = await bcrypt.compare(password, user.hashedPassword);


    // TODO 8: If passwords don't match, send a 401 response


    // TODO 9: Send a success response with the username and userId


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
