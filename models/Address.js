const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressType: { type: String, required: true },
    houseNumber: { type: String, required: true },
    street: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    userId: { type: String, required: true }  // userId is required here
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
