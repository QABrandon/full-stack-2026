const express = require("express");
const logger = require("./middleware/logger");

const app = express();

// Use custom logging middleware FIRST
app.use(logger);

// Then built-in middleware
app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.json({
    users,
    timestamp: new Date().toISOString(),
  });
});

app.get("/random", (req, res) => {
  res.json({
    random: "test",
  });
});

app.listen(3011, () => {
  console.log("Server running on port 3011");
});
