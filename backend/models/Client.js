// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    servicesRequired: [{ type: String }], // Array of services
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
