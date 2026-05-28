const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// GET All Users
app.get("/users", (req, res) => {
  // Return users and count
  res.json({
    users: users,
    count: users.length,
  });
});

// To test this we visit
// localhost:3000/users/1
app.get("/users/:id", (req, res) => {
  // try to complete this one
  //console.log("request object", req);

  // start simple and hard code the id
  //const id = 1;

  // to fix the hard coded id
  const { id } = req.params;

  console.log("req.params", req.params);

  // use the id to grab from the array of users
  // the correct user object
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

  // if doing strict equality, have to parse int or no match
  const foundUser = users.find((e) => e.id === parseInt(id));

  console.log("foundUser", foundUser);

  res.json({
    user: foundUser,
  });
});
