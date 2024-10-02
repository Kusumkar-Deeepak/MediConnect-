// routes/clientRoutes.js
const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

// Create a new client
router.post('/', async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: 'Error creating client', error });
    }
});

// Additional client-related routes can be added here

module.exports = router;
