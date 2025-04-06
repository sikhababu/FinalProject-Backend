const mongoose = require('mongoose');

// Defining a schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

    unique: true
   
  },
  password: {
    type: String,
    required: true,  
   
  },

  address: {
    type: String,
    required: true,  
   
  },
  role: {
    type: String,
  
    enum: ['user', 'admin'],
    default: 'user' 
   
  }



}, {timestamps:true});

// Creating a model from the schema
const UserModel = mongoose.model('users', userSchema);

module.exports= UserModel