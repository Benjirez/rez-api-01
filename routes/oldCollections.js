const express = require('express')
const router = express.Router()
const oldCols= require('../models/OldCollections.js')
//get all
let collPick = 0



router.get( '/:pick', async (req, res)=>{ 
    collPick = req.params.pick
    try{
        //console.log(oldCols[0])
        const myData = await oldCols[req.params.pick].find()
        //const myData = await Data.find()
        console.log ('my data is: ' + myData.length)
        res.json( myData )
    }catch(err){
        console.log('nope')
        res.status(500).json( {message: err.message}) //server or DB error (not user)
    }

} )

//get one 
router.get( '/:id', async (req, res)=>{ 

    try{
        const data = await Data.findById()
        res.json( data )
    }catch(err){
        console.log('nope')
        res.status(500).json( {message: err.message}) //server or DB error (not user)
    }
    
} )

//create one
router.post( '/', async (req, res)=>{ 
    const data = new oldCols[collPick]({
        col_a: req.body.col_a, 
        col_b: req.body.col_b, 
        col_c: req.body.col_c, 
        col_d: req.body.col_d, 
        col_e: req.body.col_e, 
        col_f: req.body.col_f, 
        col_g: req.body.col_g, 
        col_h: req.body.col_h
      })
    try{
        await data.save()
        const myData = await oldCols[collPick].find()
        //console.log ('my data is: ' + myData.length)
        res.json( myData )
    }catch(err){
        res.status(400).json( {message: err.message}) // 400 bad user data
        
    }
} )

//patch one
router.patch( '/:id', async (req, res)=>{ 

    const data = await oldCols[collPick].findById( req.params.id )
   if (req.body.title != null){ data.title = req.body.title }
    data.save()
    res.send( req.params.id )
} )

//delete one
router.delete( '/:id', async (req, res)=>{ 
    await oldCols[collPick].findByIdAndDelete( req.params.id ); 
    const myData = await oldCols[collPick].find()
        //console.log ('my data is: ' + myData.length)
        res.json( myData )
} )

module.exports = router