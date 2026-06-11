// User Model
// This file manages user data in memory

// In-memory storage for users
const users = [];

// ID counter for generating unique user IDs
let userIdCounter = 1;

// User model object with methods to interact with user data
const User = {
  // Get all users
  getAll() {
    return users;
  },

  // Find user by ID
  findById(userId) {
    return users.find(user => user.id === userId);
  },

  // Find user by username
  findByUsername(username) {
    return users.find(user => user.username === username);
  },

  // Find user by email
  findByEmail(email) {
    return users.find(user => user.email === email);
  },

  // Find user by username or email
  findByUsernameOrEmail(username, email) {
    return users.find(
      user => user.username === username || user.email === email
    );
  },

  // Create a new user
  create(userData) {
    const newUser = {
      id: userIdCounter++,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: new Date()
    };

    users.push(newUser);
    return newUser;
  },

  // Update user by ID
  updateById(userId, updateData) {
    const user = users.find(u => u.id === userId);

    if (!user) {
      return null;
    }

    // Update user properties
    if (updateData.email) user.email = updateData.email;
    if (updateData.password) user.password = updateData.password;

    return user;
  },

  // Delete user by ID
  deleteById(userId) {
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  },

  // Get user without password field
  getSafeUser(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }
};

// Export the User model
module.exports = User;
