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
import User from '../models/User.js';
const router = express.Router();
import {Dsa} from '../models/DSA.js'
// add new question
router.post('/', async (req, res) => {
  // console.log("Received data is: ", req.body);
  try{

    console.log("addeing new question ",req.body)
    const user=await User.findById(res.locals.jwtData.id);
    if(!user)
        return res.status(401).json({message:"User not registered or token malfunctioned"})
//  grab questions of user
const newQue= req.body;

user.dsa.push(newQue);
await user.save();

return res.status(201).json(newQue);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// get the questions
router.get('/', async (req, res) => {
  try{

    console.log("getting questions ")
    const user=await User.findById(res.locals.jwtData.id);
    if(!user)
        return res.status(401).json({message:"User not registered or token malfunctioned"})

    if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }

return res.status(200).send(user.dsa);
    }catch(error){
        return res.status(500).json({message:"Server error."})
    }
});

router.delete('/:id', async (req, res) => {
  console.log("Deleting question with ID:", req.params.id);
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered or token malfunctioned" });
    }

    // Find the index of the question to be deleted from the dsa array
    const questionIndex = user.dsa.findIndex(question => question._id.toString() === req.params.id);
    if (questionIndex === -1) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Remove the question from the dsa array
    user.dsa.splice(questionIndex, 1);
    await user.save();

    return res.status(200).json({ message: 'Entry deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});


export default router;
