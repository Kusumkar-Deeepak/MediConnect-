// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clientRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const authMiddleware = require('./middleware/auth');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware); // Apply the authentication middleware globally

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Database Calling
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
