// Users Controller - Business logic for blog users

// Sample users data
let users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "author",
    createdAt: new Date('2024-01-12').toISOString()
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "author",
    createdAt: new Date('2024-01-14').toISOString()
  }
];

let nextId = 4;

// Get all users
const getAllUsers = (req, res) => {
  try {
    // Optional filtering by role
    const { role } = req.query;
    let filteredUsers = users;

    if (role) {
      filteredUsers = users.filter(user => user.role.toLowerCase() === role.toLowerCase());
    }

    res.json({
      users: filteredUsers,
      count: filteredUsers.length,
      totalUsers: users.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve users',
      message: error.message
    });
  }
};

// Get user by ID
const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `No user exists with ID ${id}`
      });
    }

    res.json({
      user: user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve user',
      message: error.message
    });
  }
};

// Create new user
const createUser = (req, res) => {
  try {
    const { name, email, role = 'author' } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name and email are required',
        received: { name, email, role }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists',
        message: 'A user with this email address already exists'
      });
    }

    // Validate role
    const validRoles = ['admin', 'author', 'reader'];
    if (!validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid role',
        message: `Role must be one of: ${validRoles.join(', ')}`
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Name must be at least 2 characters long'
      });
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      role: role.toLowerCase(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create user',
      message: error.message
    });
  }
};

// Update user
const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({
        error: 'User not found',
        message: `No user exists with ID ${id}`
      });
    }

    // Validation for provided fields
    if (name !== undefined && name.length < 2) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Name must be at least 2 characters long'
      });
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Please provide a valid email address'
        });
      }

      // Check if email already exists (excluding current user)
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== parseInt(id));
      if (existingUser) {
        return res.status(400).json({
          error: 'Email already exists',
          message: 'A user with this email address already exists'
        });
      }
    }

    if (role !== undefined) {
      const validRoles = ['admin', 'author', 'reader'];
      if (!validRoles.includes(role.toLowerCase())) {
        return res.status(400).json({
          error: 'Invalid role',
          message: `Role must be one of: ${validRoles.join(', ')}`
        });
      }
    }

    // Update user (only update provided fields)
    const updatedUser = {
      ...users[userIndex],
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(role !== undefined && { role: role.toLowerCase() })
    };

    users[userIndex] = updatedUser;

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update user',
      message: error.message
    });
  }
};

// Delete user
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({
        error: 'User not found',
        message: `No user exists with ID ${id}`
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    res.json({
      message: 'User deleted successfully',
      user: deletedUser,
      remainingUsers: users.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete user',
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};