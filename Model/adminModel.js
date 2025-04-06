const mongoose = require('mongoose');

// Defining a schema for a admin
const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,

    unique: true
   
  },
  password: {
    type: String,
    required: true,  
   
  }

}, {timestamps:true});

// Creating a model from the schema
const AdminModel = mongoose.model('admin', adminSchema);

module.exports= AdminModel

