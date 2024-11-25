const express = require('express');
const router = express.Router();

// Define API routes here
router.get('/laundry-services', (req, res) => {
    // Logic to retrieve laundry services
    res.json({ message: "Laundry services" });
});


module.exports = router;
