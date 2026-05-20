const express = require('express');
const router = express.Router();
const StoreName = require('../models/StoreName.js');

const DEFAULTS = ['1', '2', '3', '4', '5', '6'];

router.get('/', async (req, res) => {
  try {
    const docs = await StoreName.find();
    res.json(docs.length ? docs.map(d => d.name) : DEFAULTS);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'name is required' });
  }
  try {
    const doc = await StoreName.create({ name: name.trim() });
    res.status(201).json({ name: doc.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
