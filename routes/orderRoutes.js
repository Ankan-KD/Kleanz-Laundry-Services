const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route for placing an order
router.post('/schedule-order', async (req, res) => {
    const { name, phone, email, quantity, message, userId, items } = req.body;

    if (!userId) {
        return res.status(400).send('userId is required'); // If no userId, return an error
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).send('Items are required and must be an array.');
    }

    try {
        const newOrder = new Order({
            name,
            phone,
            email,
            quantity,
            items, // Include the array of items
            message,
            userId
        });

        await newOrder.save();
        res.status(201).send('Order placed successfully with items');
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).send('Error saving order');
    }
});

module.exports = router;
