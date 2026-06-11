// User Controller - Handles all user-related business logic
const { User } = require('../models');

// Get all users
exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.findAll();
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single user by ID
exports.getUserById = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new user
exports.createUser = async (request, response) => {
  try {
    const newUser = await User.create(request.body);
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    await user.update(request.body);
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    response.json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
