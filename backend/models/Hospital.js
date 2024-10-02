// models/Hospital.js
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    about: { type: String, required: true },
    doctors: [{ type: String }], // Array of doctor names
    nurses: [{ type: String }], // Array of nurse names
    facilities: [{ type: String }], // Array of facilities
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
