const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

//middleware which we will talk about in a bit
app.use(express.json());

//anything in users.js will prefixed with
// /users
app.use("/users", userRoutes);

// start server

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
