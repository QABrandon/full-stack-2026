// Product Controller - Handles all product-related business logic
const { Product } = require('../models');

// Get all products
// TODO: Implement this function
// This works exactly like getAllUsers - use Product.findAll()
exports.getAllProducts = async (request, response) => {
  try {
    // TODO: Fetch all products and send them as JSON

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single product by ID
// TODO: Implement this function
// This works exactly like getUserById - use Product.findByPk()
// Remember to handle the 404 case!
exports.getProductById = async (request, response) => {
  try {
    // TODO: Find product by ID, handle 404, send as JSON

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new product
// TODO: Implement this function
// This works exactly like createUser - use Product.create(request.body)
// Send back the new product with status 201
exports.createProduct = async (request, response) => {
  try {
    // TODO: Create a new product from request.body and send with status 201

  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update product by ID
// TODO: Implement this function
// Same pattern as updateUser: find, check exists, update, send back
exports.updateProduct = async (request, response) => {
  try {
    // TODO: Find product, check if exists, update, send back

  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete product by ID
// TODO: Implement this function
// Same pattern as deleteUser: find, check exists, destroy, send message
exports.deleteProduct = async (request, response) => {
  try {
    // TODO: Find product, check if exists, delete, send success message

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
