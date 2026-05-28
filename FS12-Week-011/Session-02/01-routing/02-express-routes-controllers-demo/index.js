// Routes + Controllers Demo

const express = require("express");
const app = express();
const userRoutes = require("./routes/users")

//middleware which we will talk about in a bit
app.use(express.json());

// get rid of the users implementation
// then we have to add our routes
app.use("/users", userRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
