const express = require('express');
const { createOrder, listUserOrders, updateOrderStatus, getSellerOrders } = require('../../Controllers/orderControllers');
const authMiddleware = require('../../Middleware/authMiddleware');
const { isSeller, isUser } = require('../../Middleware/checkRole');


const orderRoutes = express.Router();

orderRoutes.post('/create',authMiddleware, isUser, createOrder);
orderRoutes.get('/my-orders',authMiddleware,isUser, listUserOrders);
orderRoutes.get('/seller-orders',authMiddleware,isSeller, getSellerOrders);
orderRoutes.put('/update/:id',authMiddleware, isSeller, updateOrderStatus);

module.exports = orderRoutes;
