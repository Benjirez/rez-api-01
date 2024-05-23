// require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
// const cors = require('cors');
const oldRouter = require('./routes/oldCollections.js')
const PORT = process.env.PORT || 3000


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MC DB ona mic: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here

/*
// Configure CORS
const corsOptions = {
  origin: 'https://rez-client-01.vercel.app/', // Replace with the client origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

//app.use(cors());
*/

app.use(express.json())

// Routes
app.use('//old/0', (req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://rez-client-01.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}, oldRouter);

// app.use('/old', oldRouter )

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("yeeee boyeee listening");
    })
})
