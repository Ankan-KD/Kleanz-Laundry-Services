const express = require('express');
const router = express.Router();
const Selection = require('../models/Selection');
const Order = require('../models/order');
const Address = require('../models/Address');
const OrderStatus = require('../models/OrderStatus');  // Import the OrderStatus model

// Fetch all customer details without grouping
router.get('/fetch-all-details', async (req, res) => {
    try {
        // Fetch all data from each collection
        const services = await Selection.find();
        const orders = await Order.find();
        const addresses = await Address.find();
        
        // Fetch all order statuses
        const statuses = await OrderStatus.find();  // Fetch order statuses

        // Group statuses by userId
        const statusMap = statuses.reduce((acc, status) => {
            acc[status.userId] = status.status;
            return acc;
        }, {});

        // Map the status to orders based on userId
        const ordersWithStatus = orders.map(order => ({
            ...order.toObject(),
            status: statusMap[order.userId] || 'In Progress', // Set status from OrderStatus or default to 'In Progress'
        }));

        // Send all data as JSON, including statuses
        res.status(200).json({ services, orders: ordersWithStatus, addresses });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Error fetching details' });
    }
});

module.exports = router;
