// const mongoose = require('mongoose');

// const DSASchema = new mongoose.Schema({
//   title: String,
//   topic: String,
//   bruteForce: String,
//   optimal: String,
//   level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('DSA', DSASchema);

import mongoose, { mongo } from 'mongoose';

export const DSASchema = new mongoose.Schema({
  title: String,
  topic: String,
  bruteForce: String,
  optimal: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  date: { type: Date, default: Date.now }
});

// no need of dsa model, it is just a schema which is uses in user model
export const Dsa=mongoose.model('dsa',DSASchema)

