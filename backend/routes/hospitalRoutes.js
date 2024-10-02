// routes/hospitalRoutes.js
const express = require('express');
const Hospital = require('../models/Hospital');
const router = express.Router();

// Create a new hospital
router.post('/', async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        await newHospital.save();
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(400).json({ message: 'Error creating hospital', error });
    }
});

// Additional hospital-related routes can be added here

module.exports = router;
