// Cart Item Routes - Defines all cart item-related endpoints
const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

// GET /api/cart-items - Get all cart items
router.get('/', cartItemController.getAllCartItems);

// GET /api/cart-items/:id - Get single cart item by ID
router.get('/:id', cartItemController.getCartItemById);

// POST /api/cart-items - Add item to cart
router.post('/', cartItemController.createCartItem);

// PUT /api/cart-items/:id - Update cart item by ID
router.put('/:id', cartItemController.updateCartItem);

// DELETE /api/cart-items/:id - Delete cart item by ID
router.delete('/:id', cartItemController.deleteCartItem);

module.exports = router;
