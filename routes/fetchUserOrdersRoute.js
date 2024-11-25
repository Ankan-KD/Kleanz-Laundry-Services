const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Address = require('../models/Address');
const Selection = require('../models/Selection');
const OrderStatus = require('../models/OrderStatus'); // Import the OrderStatus model

// Route to fetch user details by userId
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch the user's orders, addresses, and services
        const orders = await Order.find({ userId });
        const addresses = await Address.find({ userId });
        const selection = await Selection.findOne({ userId });

        // Fetch order status for this userId
        const statuses = await OrderStatus.find({ userId });

        // Assuming the status is the same for all orders under the same userId
        const statusMap = statuses.length > 0 ? statuses[0] : null; // Fetching the first status for the user

        // If statusMap exists, use the status, otherwise set a default
        const status = statusMap ? statusMap.status : 'In Progress';

        // Add status to each order
        const ordersWithStatus = orders.map(order => {
            return {
                ...order.toObject(),
                status: status, // All orders for the user will share the same status
            };
        });

        // Prepare the response data
        const response = {
            orders: ordersWithStatus,
            addresses,
            services: selection ? selection.services : [],
        };

        res.json(response); // Send the response as JSON
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
