const express = require('express');
const router = express.Router();
const Selection = require('../models/Selection');

// Route for adding a service selection
router.post('/api/select-services', async (req, res) => {
    const { services, userId } = req.body; // Expecting userId and services from the frontend

    // Check if the userId is present in the request
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' }); // Return error as JSON
    }

    try {
        // Create a new selection entry in the database
        const newSelection = new Selection({
            services,
            userId, // Use the userId passed from the frontend
        });

        // Save the selection in the database
        await newSelection.save();

        // Respond with a success message as JSON
        res.status(201).json({ message: 'Selection saved successfully' });
    } catch (error) {
        console.error('Error saving selection:', error);

        // Return error as JSON if there's an issue saving to the database
        res.status(500).json({ error: 'Error saving selection' });
    }
});

module.exports = router;
