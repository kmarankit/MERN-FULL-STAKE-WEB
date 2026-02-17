import asyncHandler from 'express-async-handler';
import { CartItem } from '../modals/cartItem.js';

// @desc    Get all cart items for a user
// @route   GET /api/cart
export const getCart = asyncHandler(async (req, res) => {
    // Switch from .uid to .id (The MongoDB ID attached by your new middleware)
    const userId = req.user.id; 
    
    const items = await CartItem.find({ user: userId }).populate('item');
    
    const formatted = items.map(ci => ({
        _id: ci._id.toString(),
        item: ci.item,
        quantity: ci.quantity,
    }));
    
    res.json(formatted);
});

// @desc    Add item to cart or increase quantity
// @route   POST /api/cart
export const addToCart = asyncHandler(async (req, res) => {
    const { itemId, quantity } = req.body;
    
    if (!itemId || typeof quantity !== 'number') {
        res.status(400);
        throw new Error('itemId and quantity (number) are required');
    }

    const userId = req.user.id; 

    // Find if item already exists in this user's cart
    let cartItem = await CartItem.findOne({ user: userId, item: itemId });

    if (cartItem) {
        // Update existing quantity
        cartItem.quantity = cartItem.quantity + quantity;

        if (cartItem.quantity < 1) {
            await CartItem.deleteOne({ _id: cartItem._id });
            return res.json({ _id: cartItem._id.toString(), quantity: 0 });
        }
        await cartItem.save();
    } else {
        // Create new cart entry
        cartItem = await CartItem.create({
            user: userId,
            item: itemId,
            quantity: Math.max(1, quantity),
        });
    }

    // Populate and return the full object for the frontend
    const populatedItem = await CartItem.findById(cartItem._id).populate('item');

    res.status(200).json({
        _id: populatedItem._id.toString(),
        item: populatedItem.item,
        quantity: populatedItem.quantity,
    });
});

// @desc    Update specific cart item quantity
// @route   PUT /api/cart/:id
export const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const userId = req.user.id;

    const cartItem = await CartItem.findOne({ _id: req.params.id, user: userId });
    
    if (!cartItem) {
        res.status(404);
        throw new Error('Cart item not found');
    }

    cartItem.quantity = Math.max(1, quantity);
    await cartItem.save();
    await cartItem.populate('item');

    res.json({
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
    });
});

// @desc    Remove specific item from cart
// @route   DELETE /api/cart/:id
export const deleteCartItem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const cartItem = await CartItem.findOne({ _id: req.params.id, user: userId });
    
    if (!cartItem) {
        res.status(404);
        throw new Error('Cart item not found');
    }

    await cartItem.deleteOne();
    res.json({ _id: req.params.id });
});

// @desc    Clear entire cart for user
// @route   POST /api/cart/clear
export const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await CartItem.deleteMany({ user: userId });
    res.json({ message: 'Cart cleared' });
});