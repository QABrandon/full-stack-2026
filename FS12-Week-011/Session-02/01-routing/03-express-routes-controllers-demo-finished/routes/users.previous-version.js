const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET All Users

router.get("/", (req, res) => {
  // return back users and count in a new object
  // when we visit localhost:3000/users
  // you can visit this on the browser/postman/whatever tool
  res.json({
    users: users,
    count: users.length,
  });
});

// POST START - create a new user
//router.verb - post
// notice same /users endpoint, different verb (post vs get)

// Use postman to test this endpoint
// POST localhost:3000/users
// set a body to have the following
// {
//    "name": "Jacob",
//    "email": "jacob@example.com"
// }

// then test GET localhost:3000/users to see it in the list

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  // add this to our in-memory array
  // we will get to the point where we are updating a database
  // on restart of the server, any added users will be gone
  users.push(newUser);
  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});

// POST END

// PUT - update entire resource
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex] = { id: parseInt(id), name, email };
  res.json({
    message: "User updated",
    user: users[userIndex],
  });
});
// PUT END

// DELETE START - remove resource
router.delete("/:id", (req, res) => {
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
});
// DELETE END

// URL Parameters
// Single parameter
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    user: user,
  });
});

module.exports = router;
