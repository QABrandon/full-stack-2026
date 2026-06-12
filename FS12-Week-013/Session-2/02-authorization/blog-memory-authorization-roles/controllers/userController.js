// User Controller
// This file handles user-related logic.
// Includes an admin-only endpoint for changing another user's role.

const User = require('../models/User');
const Post = require('../models/Post');
const Role = require('../models/Role');

// Get the logged-in user's profile (protected)
function getProfile(request, response) {
  try {
    // Find user by ID from authenticated token
    const user = User.findById(request.user.userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Count user's posts
    const postCount = Post.countByAuthor(request.user.userId);

    // Look up the role so we can return a human-readable name
    const role = Role.findById(user.roleId);

    // Send response without password
    response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
        roleName: role ? role.name : 'unknown',
        roleDescription: role ? role.description : '',
        permissions: role ? role.permissions : [],
        createdAt: user.createdAt,
        postCount: postCount
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    response.status(500).json({ error: 'Failed to get profile' });
  }
}

// Get all users (admin only)
// In the authentication-middleware example this was open to everyone.
// Here we restrict it to admins only, because listing users is a great
// example of something that should require elevated privileges.
function getAllUsers(request, response) {
  try {
    const users = User.getAll();

    // Map users to exclude passwords but include their role name
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

// Change another user's role (admin only)
// Body: { roleName: "author" }
// This is how an admin promotes an author to an admin.
function updateUserRole(request, response) {
  try {
    const targetUserId = parseInt(request.params.userId);
    const newRoleName = request.body.roleName;

    // Make sure the target user exists
    const targetUser = User.findById(targetUserId);

    if (!targetUser) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Make sure the new role exists
    const newRole = Role.findByName(newRoleName);

    if (!newRole) {
      const validRoles = Role.getAll().map(r => r.name).join(', ');
      return response.status(400).json({
        error: `Invalid role. Valid roles are: ${validRoles}`
      });
    }

    // Safety check: stop an admin from demoting themselves by accident
    // (a simple guard to prevent the system from ending up with zero admins)
    if (targetUser.id === request.user.userId && newRoleName !== 'admin') {
      return response.status(400).json({
        error: 'You cannot remove your own admin role'
      });
    }

    // Perform the update
    User.updateById(targetUserId, { roleId: newRole.id });

    response.json({
      message: `User ${targetUser.username} is now a ${newRole.name}`,
      user: User.getSafeUser(User.findById(targetUserId))
    });

  } catch (error) {
    console.error('Update user role error:', error);
    response.status(500).json({ error: 'Failed to update user role' });
  }
}

// Export controller functions
module.exports = {
  getProfile,
  getAllUsers,
  updateUserRole
};
