const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema({
    services: {
        type: [String], // An array of selected services (e.g., ['Laundry', 'Dry Cleaning'])
        required: true,
    },
    userId: {
        type: String, // userId is a string
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the creation date
    },
});

const Selection = mongoose.model('Selection', selectionSchema);

module.exports = Selection;
