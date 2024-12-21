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

const dsaRoute = require('./routes/dsa');
app.use('/api/dsa', dsaRoute);

app.listen(5000, () => console.log('Server running on port 5000'));