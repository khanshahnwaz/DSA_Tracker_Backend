const express = require('express');
const router = express.Router();
const DSA = require('../models/DSA');

router.post('/', async (req, res) => {
  const newDSA = new DSA(req.body);
  console.log("recieved data is: ",req.body)
  try {
    const savedDSA = await newDSA.save();
    res.json(savedDSA);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const dsaEntries = await DSA.find();
    res.json(dsaEntries);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await DSA.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;