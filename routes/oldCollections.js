const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const oldCols = require('../models/OldCollections.js');
const StoreName = require('../models/StoreName.js');

const UserSchema = new mongoose.Schema({
  col_a: String, col_b: String, col_c: String, col_d: String,
  col_e: String, col_f: String, col_g: String, col_h: String,
  col_i: String, col_j: String,
});

let collPick = 0;

const getModel = async (pick) => {
  const stores = await StoreName.find().sort({ _id: 1 });
  if (stores[pick]) {
    const collName = stores[pick].collectionName ||
                     stores[pick].name.trim().toLowerCase().replace(/\s+/g, '_');
    return mongoose.models[collName] ||
           mongoose.model(collName, UserSchema, collName);
  }
  return oldCols[pick];
};

router.get('/:pick', async (req, res) => {
  collPick = req.params.pick;
  try {
    const Model = await getModel(parseInt(collPick));
    const myData = await Model.find();
    res.json(myData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const Model = await getModel(parseInt(collPick));
    const data = new Model({
      col_a: req.body.col_a, col_b: req.body.col_b, col_c: req.body.col_c,
      col_d: req.body.col_d, col_e: req.body.col_e, col_f: req.body.col_f,
      col_g: req.body.col_g, col_h: req.body.col_h
    });
    await data.save();
    const myData = await Model.find();
    res.json(myData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const Model = await getModel(parseInt(collPick));
    const data = await Model.findById(req.params.id);
    if (req.body.title != null) { data.title = req.body.title; }
    await data.save();
    res.send(req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const Model = await getModel(parseInt(collPick));
    await Model.findByIdAndDelete(req.params.id);
    const myData = await Model.find();
    res.json(myData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
