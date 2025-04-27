const express = require('express');
const { createOrder, listUserOrders, updateOrderStatus, getSellerOrders } = require('../Controllers/orderControllers');
const authMiddleware = require('../Middleware/authMiddleware');


const orderRoutes = express.Router();

orderRoutes.post('/create',authMiddleware, createOrder);
orderRoutes.get('/my-orders',authMiddleware, listUserOrders);
orderRoutes.get('/seller-orders',authMiddleware, getSellerOrders);
orderRoutes.put('/update/:id', updateOrderStatus);

module.exports = orderRoutes;
