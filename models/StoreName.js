const mongoose = require('mongoose');

const StoreNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collectionName: { type: String, required: true }
});

module.exports = mongoose.model('StoreName', StoreNameSchema, 'store_names');
