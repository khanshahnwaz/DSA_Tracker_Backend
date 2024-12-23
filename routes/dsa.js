// const express = require('express');
// const router = express.Router();
// const DSA = require('../models/DSA');

// router.post('/', async (req, res) => {
//   const newDSA = new DSA(req.body);
//   console.log("recieved data is: ",req.body)
//   try {
//     const savedDSA = await newDSA.save();
//     res.json(savedDSA);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const dsaEntries = await DSA.find();
//     res.json(dsaEntries);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     await DSA.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Entry deleted' });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

// export default router;


import express from 'express';
import DSA from '../models/DSA.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newDSA = new DSA(req.body);
  console.log("Received data is: ", req.body);
  try {
    const savedDSA = await newDSA.save();
    res.json(savedDSA);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/example',async (req,res)=>{
  res.send("finding for error.")
})
router.get('/', async (req, res) => {
  try {
    const dsaEntries = await DSA.find();
    res.json(dsaEntries);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await DSA.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
