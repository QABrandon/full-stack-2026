// Product Controller - Handles all product-related business logic
const { Product } = require('../models');

// Get all products
exports.getAllProducts = async (request, response) => {
  try {
    const products = await Product.findAll();
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (request, response) => {
  try {
    const product = await Product.findByPk(request.params.id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    response.json(product);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new product
exports.createProduct = async (request, response) => {
  try {
    const newProduct = await Product.create(request.body);
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update product by ID
exports.updateProduct = async (request, response) => {
  try {
    const product = await Product.findByPk(request.params.id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    await product.update(request.body);
    response.json(product);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (request, response) => {
  try {
    const product = await Product.findByPk(request.params.id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
