
// db.js
const mongoose = require('mongoose')

function connectDB() {
    
  mongoose.connection.on('error', err => {
      console.log('dj fkn up :' + err);
  })
  mongoose.connection.on('open', ()=>{
      console.log('MC on the DB')
  })
  try {
      return mongoose.connect(process.env.DB_URI)
  } catch (err) {
      console.log('connect error: ' + err);
  }
    
}

  module.exports = connectDB
