const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const hospitalRoutes = require('./routes/hospitalRoutes');
const connectDB = require('./config/db');
const port = 3000;
require("dotenv").config();

connectDB();

// Middleware
app.use(cors())
app.use(bodyParser.json()); // To parse JSON request bodies

app.use('/api/hospitals', hospitalRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});