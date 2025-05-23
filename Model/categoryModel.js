const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String, // storing image URL or path
    required: true
  }
}, { timestamps: true });

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
