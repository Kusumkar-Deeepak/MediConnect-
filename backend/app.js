const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const hospitalRoutes = require('./routes/hospitalRoutes');
const clientRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const port = 3000;
require("dotenv").config();

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

app.use('/api/hospitals', hospitalRoutes);
app.use('/api/clients', clientRoutes);
// app.use('/api/hospitals/login', authRoutes);
// app.use('/api/clients/login', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
