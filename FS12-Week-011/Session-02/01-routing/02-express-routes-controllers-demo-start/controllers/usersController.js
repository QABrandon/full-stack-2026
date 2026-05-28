// Sample data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users

const getAllUsers = (req, res) => {
  // return back users and count in a new object
  // when we visit localhost:3000/users
  // you can do this in Postman/browser/whatever tool
  res.json({
    users: users,
    count: users.length,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({
    message: "User deleted",
    user: deletedUser,
  });
};

module.exports = {
  getAllUsers,
  //   getUserById,
  //   createUser,
  //   updateUser,
  deleteUser,
};
