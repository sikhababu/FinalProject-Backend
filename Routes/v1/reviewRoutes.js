const express = require('express');
const { addReview, getProductReviews } = require('../../Controllers/reviewControllers');
const authMiddleware = require('../../Middleware/authMiddleware');


const reviewRoutes = express.Router();

reviewRoutes.post('/', authMiddleware, addReview);
reviewRoutes.get('/:productId', getProductReviews);

module.exports = reviewRoutes;