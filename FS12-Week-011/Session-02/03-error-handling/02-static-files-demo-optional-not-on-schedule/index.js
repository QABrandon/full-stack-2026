const express = require("express");
const path = require("path");

const app = express();

//Serve Static Files from the "public" directory

app.use(express.static("public"));

app.listen(3500, () => {
  console.log("Server running on port 3500");
  console.log("Test static files:");
});
