// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// Connect routes to controller methods
// every endpoint here will be prefixed with
// localhost:3000/users
router.get("/", userController.getAllUsers); // localhost:3000/users
router.get("/:id", userController.getUserById); // localhost:3000/users/1
router.post("/", userController.createUser); // localhost:3000/users
router.put("/:id", userController.updateUser); // localhost:3000/users/1
router.delete("/:id", userController.deleteUser); // localhost:3000/users/1

module.exports = router;
