const mongoose = require('mongoose');

const collection = ['model_x1s', 'new_tab_01', 'new_tab_01_backup', 'new_tab_03', 'new_tab_04', 'rez-new-tab-2022-01-db']

const UserSchema = new mongoose.Schema({
    col_a: String,
    col_b: String,
    col_c: String,
    col_d: String,
    col_e: String,
    col_f: String,
    col_g: String,
    col_h: String,
  
  });


  module.exports = mongoose.model(collection[0], UserSchema);