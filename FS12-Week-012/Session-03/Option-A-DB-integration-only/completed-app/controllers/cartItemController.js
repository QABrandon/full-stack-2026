// Cart Item Controller - Handles all cart item-related business logic
const { CartItem, User, Product } = require('../models');

// Get all cart items with populated user and product information
exports.getAllCartItems = async (request, response) => {
  try {
    const cartItems = await CartItem.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });
    response.json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get cart items for a specific user
exports.getCartItemsByUser = async (request, response) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: request.params.userId },
      include: [
        { model: Product, attributes: ['id', 'name', 'price', 'category'] }
      ]
    });
    response.json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single cart item by ID
exports.getCartItemById = async (request, response) => {
  try {
    const cartItem = await CartItem.findByPk(request.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });

    if (!cartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    response.json(cartItem);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Add item to cart
exports.createCartItem = async (request, response) => {
  try {
    const newCartItem = await CartItem.create(request.body);
    const populatedCartItem = await CartItem.findByPk(newCartItem.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });
    response.status(201).json(populatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update cart item by ID (typically to change quantity)
exports.updateCartItem = async (request, response) => {
  try {
    const cartItem = await CartItem.findByPk(request.params.id);

    if (!cartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.update(request.body);

    const populatedCartItem = await CartItem.findByPk(cartItem.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });

    response.json(populatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete cart item by ID (remove from cart)
exports.deleteCartItem = async (request, response) => {
  try {
    const cartItem = await CartItem.findByPk(request.params.id);

    if (!cartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    response.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
