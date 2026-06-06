// User Controller - Handles all user-related business logic
const { User } = require('../models');

// Get all users
// TODO: Implement this function
// Steps:
//   1. Use User.findAll() to get all users from the database
//   2. Send the users back as JSON using response.json()
//   3. If something goes wrong, catch the error and send a 500 status with the error message
exports.getAllUsers = async (request, response) => {
  try {
    // TODO: Fetch all users and send them as JSON

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single user by ID
// TODO: Implement this function
// Steps:
//   1. Use User.findByPk(request.params.id) to find one user by their ID
//   2. If no user is found, send a 404 status with { error: 'User not found' }
//   3. If found, send the user as JSON
exports.getUserById = async (request, response) => {
  try {
    // TODO: Find user by primary key and send as JSON
    // Remember to handle the case where the user doesn't exist (404)

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new user
// TODO: Implement this function
// Steps:
//   1. Use User.create(request.body) to create a new user with the data from the request
//   2. Send the new user back with a 201 status code
//   3. If validation fails, catch the error and send a 400 status
exports.createUser = async (request, response) => {
  try {
    // TODO: Create a new user from request.body and send it back with status 201

  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update user by ID
// TODO: Implement this function
// Steps:
//   1. Find the user by ID using User.findByPk()
//   2. If not found, send 404
//   3. Use user.update(request.body) to update the user's fields
//   4. Send the updated user as JSON
exports.updateUser = async (request, response) => {
  try {
    // TODO: Find user, check if exists, update, and send back

  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete user by ID
// TODO: Implement this function
// Steps:
//   1. Find the user by ID using User.findByPk()
//   2. If not found, send 404
//   3. Use user.destroy() to delete the user
//   4. Send a success message: { message: 'User deleted successfully' }
exports.deleteUser = async (request, response) => {
  try {
    // TODO: Find user, check if exists, delete, and send success message

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
