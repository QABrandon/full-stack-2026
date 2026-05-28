// Sample data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users
const getAllUsers = (req, res) => {
  res.json({
    users: users,
    count: users.length,
  });
};

// Get user by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      requestedId: id,
    });
  }

  res.json({
    user: user,
  });
};

// Create new user
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
      received: { name, email },
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

// Update user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  users[userIndex] = { id: parseInt(id), name, email };
  res.json({
    message: "User updated successfully",
    user: users[userIndex],
  });
};

// Delete user
const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({
    message: "User deleted successfully",
    user: deletedUser,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
