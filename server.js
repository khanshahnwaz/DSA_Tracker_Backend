const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin:'*', // Add localhost for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:'false'
};

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  app.get('/',(req, res) => {
    res.send('Hello! Welcome to DSA_Tracker.');
  })


const dsaRoute = require('./routes/dsa');
app.options('*', cors(corsOptions));

app.use('/api/dsa', dsaRoute);
app.listen(5000, () => console.log('Server running on port 5000'));

// module.exports=app;

// Handle preflight OPTIONS requests

  // // Vercel serverless function handler
  // module.exports = (req, res) => {
  //   // Use the express app as a request handler
  //   app(req, res);
  // };



