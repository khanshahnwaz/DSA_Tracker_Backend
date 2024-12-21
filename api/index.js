const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello! Welcome to DSA_Tracker.');
});

// Your DSA route (assuming it's defined in /routes/dsa.js)
const dsaRoute = require('../routes/dsa');
app.use('/api/dsa', dsaRoute);

// Export the Express app as a serverless function for Vercel
module.exports = (req, res) => {
  app(req, res);  // Handle incoming requests via Express
};
