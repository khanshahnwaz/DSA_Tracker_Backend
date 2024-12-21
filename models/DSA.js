const mongoose = require('mongoose');

const DSASchema = new mongoose.Schema({
  title: String,
  topic: String,
  bruteForce: String,
  optimal: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DSA', DSASchema);
