const express = require('express')

const { addToCart, removeFromCart, listCart, clearCart } = require('../Controllers/cartControllers')

const authMiddleware = require('../Middleware/authMiddleware')

const cartRoutes = express.Router()


cartRoutes.post('/addToCart',authMiddleware, addToCart)
cartRoutes.post('/removeFromCart',authMiddleware,removeFromCart)
cartRoutes.get('/getCartDetails',authMiddleware,listCart)
cartRoutes.delete('/clearCart',authMiddleware,clearCart)

module.exports = cartRoutes