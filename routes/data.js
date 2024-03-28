const express = require('express')
const router = express.Router()
const Data= require('../models/DataOld.js')
//get all

router.get( '/', async (req, res)=>{ 
    
    try{
        const myData = await Data.find()
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
    const data = new Data( {
        a: req.body.a,
        b: req.body.b,
        c: req.body.c,
        d: req.body.d
        
      })
    try{
        await data.save()
        const newMyData = await Data.find()
        res.status(201).json( newMyData ) //201 post created
    }catch(err){
        res.status(400).json( {message: err.message}) // 400 bad user data
    }
} )

//patch one
router.patch( '/:id', async (req, res)=>{ 

    const data = await Data.findById( req.params.id )
   if (req.body.title != null){ data.title = req.body.title }
    data.save()
    res.send( req.params.id )
} )

//delete one
router.delete( '/:id', async (req, res)=>{ 
    const bye = await Data.findByIdAndDelete( req.params.id ); 
    res.send( 'deleted: ' + bye)
} )

module.exports = router