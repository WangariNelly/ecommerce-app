const mongoose = require('mongoose');


 const productSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, `Please enter product name`],
    trim: true,
    maxLength: [100, `P`]
   
 })


 module.exports = mongoose.model('Product',productSchema);