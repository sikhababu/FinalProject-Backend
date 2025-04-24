// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () {
      return this.role === 'user'; // name required only for regular users
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: function () {
      return this.role === 'user'; // address required only for regular users
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
    default: 'user'
  }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
