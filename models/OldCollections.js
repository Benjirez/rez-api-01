const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    col_a: String,
    col_b: String,
    col_c: String,
    col_d: String,
    col_e: String,
    col_f: String,
    col_g: String,
    col_h: String,
    col_i: String,
    col_j: String,
  });

const model_x1s = mongoose.model('model_x1s', UserSchema, 'model_x1s')

const new_tab_01 = mongoose.model('new_tab_01', UserSchema, 'new_tab_01')

const new_tab_01_backup = mongoose.model('new_tab_01_backup', UserSchema, 'new_tab_01_backup')


const new_tab_03 = mongoose.model('new_tab_03', UserSchema, 'new_tab_03')

const new_tab_04 = mongoose.model('new_tab_04', UserSchema, 'new_tab_04')

const rez_new_tab_2022_01_db = mongoose.model('rez-new-tab-2022-01-db', UserSchema, 'rez-new-tab-2022-01-db')


  

  module.exports = [model_x1s, new_tab_01, new_tab_01_backup, new_tab_03, new_tab_04, rez_new_tab_2022_01_db]