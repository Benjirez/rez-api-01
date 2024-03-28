require('dotenv').config()
const connectDB = require('./db') //function to connect with db
const express = require('express')
const app = express()
const cors = require('cors');
//const dataRouter = require('./routes/data.js')
const oldRouter = require('./routes/oldCollections.js')

app.use(cors());
app.use(express.json())

app.use('/old', oldRouter )
//app.use('/data', dataRouter)



;( async ()=>{
    await connectDB()
    app.listen(3000, ()=>{ console.log('server1 in effect...') }) 
})()




