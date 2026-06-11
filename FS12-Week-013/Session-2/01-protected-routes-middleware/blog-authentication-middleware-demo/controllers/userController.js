// User Controller
// This file handles user-related logic

const User = require('../models/User');
const Post = require('../models/Post');

// Get user profile (protected)
function getProfile(request, response) {
  try {
    // Find user by ID from authenticated token
    const user = User.findById(request.user.userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Count user's posts
    const postCount = Post.countByAuthor(request.user.userId);

    // Send response without password
    response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        postCount: postCount
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    response.status(500).json({ error: 'Failed to get profile' });
  }
}

// Get all users (development only)
function getAllUsers(request, response) {
  try {
    const users = User.getAll();

    // Map users to exclude passwords
    const safeUsers = users.map(user => User.getSafeUser(user));

    response.json({
      count: safeUsers.length,
      users: safeUsers
    });

  } catch (error) {
    console.error('Get users error:', error);
    response.status(500).json({ error: 'Failed to get users' });
  }
}

// Export controller functions
module.exports = {
  getProfile,
  getAllUsers
};
