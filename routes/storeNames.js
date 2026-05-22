const express = require('express');
const router = express.Router();
const StoreName = require('../models/StoreName.js');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  col_a: String, col_b: String, col_c: String, col_d: String,
  col_e: String, col_f: String, col_g: String, col_h: String,
  col_i: String, col_j: String,
});

const DEFAULTS = ['1','2','3','4','5','6'].map(name => ({ _id: null, name }));

router.get('/', async (req, res) => {
  try {
    const docs = await StoreName.find();
    res.json(docs.length ? docs.map(d => ({ _id: d._id, name: d.name })) : DEFAULTS);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: 'name is required' });
  const collectionName = name.trim().toLowerCase().replace(/\s+/g, '_');
  try {
    const doc = await StoreName.create({ name: name.trim(), collectionName });
    res.status(201).json({ _id: doc._id, name: doc.name });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'store already exists' });
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: 'name is required' });
  try {
    const doc = await StoreName.findByIdAndUpdate(req.params.id, { name: name.trim() }, { new: true });
    res.json({ _id: doc._id, name: doc.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await StoreName.findByIdAndDelete(req.params.id);
    const docs = await StoreName.find();
    res.json(docs.map(d => ({ _id: d._id, name: d.name })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
