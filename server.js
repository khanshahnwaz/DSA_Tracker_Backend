const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  app.get('/',(req, res) => {
    res.send('Hello! Welcome to DSA_Tracker.');
  })


const dsaRoute = require('./routes/dsa');
app.use('/api/dsa', dsaRoute);

  // Vercel serverless function handler
  module.exports = (req, res) => {
    // Use the express app as a request handler
    app(req, res);
  };
app.listen(5000, () => console.log('Server running on port 5000'));