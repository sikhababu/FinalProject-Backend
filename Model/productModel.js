const mongoose = require('mongoose');

// Defining a schema for a product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
},
description: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true
},
stock: {
    type: Number,
    required: true
},
image: {
    type: String,
    required: true
}

}, {timestamps:true});

// Creating a model from the schema
const productModel = mongoose.model('products', productSchema);

module.exports= productModel