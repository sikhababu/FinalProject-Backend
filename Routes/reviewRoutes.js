const express = require('express');
const { addReview, getProductReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const reviewRoutes = express.Router();

reviewRoutes.post('/', authMiddleware, addReview);
reviewRoutes.get('/:productId', getProductReviews);

module.exports = reviewRoutes;