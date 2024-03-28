require('dotenv').config()
const mongoose = require('mongoose')

//const connectDB = require('./db') //function to connect with db
const express = require('express')
const app = express()
const cors = require('cors');
//const dataRouter = require('./routes/data.js')
const oldRouter = require('./routes/oldCollections.js')
const PORT = process.env.PORT || 3000

/*
app.use(cors());
app.use(express.json())

app.use('/old', oldRouter )
//app.use('/data', dataRouter)



;( async ()=>{
    await connectDB()
    app.listen(PORT, ()=>{ console.log('server1 in effect...') }) 
})()
*/

/* ################################################################## */

//const express = require('express')

const app = express()
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
app.use(cors());
app.use(express.json())

app.use('/old', oldRouter )

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("yeeee boyeee listening");
    })
})
