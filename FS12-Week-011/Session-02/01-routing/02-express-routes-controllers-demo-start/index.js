const express = require("express");
const app = express();

//middleware which we will talk about in a bit
app.use(express.json());

//usually this data is in a Database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET All Users

app.get("/users", (req, res) => {
  // return back users and count in a new object
  // when we visit localhost:3000/users
  // you can do this in Postman/browser/whatever tool
  res.json({
    users: users,
    count: users.length,
  });
});

// Practice -
// What would the route and code be for
// GET by user id to get an individual user
// app.get("/users/:id")

// DELETE START - remove resource
app.delete("/users/:id", (req, res) => {
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
