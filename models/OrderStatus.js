const mongoose = require('mongoose');

// Define the schema for storing order status
const orderStatusSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Cancelled'],
        default: 'In Progress'
    }
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

module.exports = OrderStatus;
