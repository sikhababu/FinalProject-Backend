const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = ReviewModel;