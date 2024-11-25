const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    quantity: { type: Number, required: true },
    items: [
        {
            itemName: { type: String, required: true },
            itemQuantity: { type: Number, required: true }
        }
    ],
    message: { type: String },
    userId: { type: String, required: true }  // userId is now a String
}, { versionKey: false });

// Use cached model if it exists, otherwise create a new one
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
