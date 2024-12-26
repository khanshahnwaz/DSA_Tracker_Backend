// // require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

// import express, { json } from 'express';
// import { connect } from 'mongoose';
// import cors from 'cors';

// const app = express();
// app.use(json());
// const corsOptions = {
//   origin:'*', // Add localhost for testing
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials:'false'
// };

// app.use(cors(corsOptions));
// // console.log("url ",process.env.MONGO_URI)
// connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log("Error while connecting ",err));

//   app.get('/',(req, res) => {
//     res.send('Hello! Welcome to DSA_Tracker.');
//   })


// import dsaRoute from './routes/dsa.js';
// app.options('*', cors(corsOptions));

// app.use('/api/dsa', dsaRoute);

// // // Vercel serverless function handler
// // module.exports = (req, res) => {
// //   // Use the express app as a request handler
// //   app(req, res);
// // };
// // app.listen(5000, () => console.log('Server running on port 5000'));
//  export default app;
// // module.exports=app


// // Handle preflight OPTIONS requests

  


// api/index.js
import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dsaRoute from './routes/dsa.js';
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser'


import { verifyToken } from './utils/token-manager.js';
const app = express();
app.use(json());

const corsOptions = {
  origin: ['https://dsa-tracker-frontend-kappa.vercel.app','http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
 

};

app.use(cors(corsOptions));

connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log("Error while connecting ", err));

app.get('/', (req, res) => {
  res.send('Hello! Welcome to DSA_Tracker.');
});
// console.log("Cookie secret ",process.env.COOKIE_SECRET)

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/dsa',verifyToken, dsaRoute);
app.use('/api/user',userRoute);
export default (req, res) => {
  app(req, res);
};
 app.listen(5000, () => console.log('Server running on port 5000'));

