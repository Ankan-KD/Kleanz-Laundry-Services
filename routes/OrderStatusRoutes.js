const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/OrderStatus');

// Update the status of an order based on userId
router.put('/api/update-status', async (req, res) => {
    try {
        const { userId, status } = req.body;

        // Update the status for the given userId
        const updatedOrder = await OrderStatus.findOneAndUpdate(
            { userId },  // Match by userId only
            { status },   // Update the status field
            { new: true, upsert: true }  // Ensure it gets updated or inserted if it doesn't exist
        );

        res.status(200).send(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('Error updating status');
    }
});

// Route to fetch all order statuses
router.get('/api/fetch-all-statuses', async (req, res) => {
    try {
        const statuses = await OrderStatus.find();  // Fetch all order statuses by userId
        res.status(200).json(statuses);
    } catch (error) {
        console.error('Error fetching order statuses:', error);
        res.status(500).send('Error fetching order statuses');
    }
});

module.exports = router;
