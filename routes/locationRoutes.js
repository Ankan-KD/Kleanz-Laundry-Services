const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// Middleware to parse JSON body if needed
router.use(express.json());  // Make sure this is included to handle JSON data

// Route for adding an address
router.post('/add-address', async (req, res) => {
    const { addressType, houseNumber, street, location, pincode, userId } = req.body; // Expecting userId from the frontend

    if (!userId) {
        return res.status(400).send('userId is required'); // If no userId, return an error
    }

    try {
        const newAddress = new Address({
            addressType,
            houseNumber,
            street,
            location,
            pincode,
            userId // Use the same userId passed from the frontend
        });

        await newAddress.save();
        res.status(201).send('Address saved successfully with userId');
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).send('Error saving address');
    }
});

module.exports = router;
