const express = require('express')

const { addToCart, removeFromCart, listCart, clearCart } = require('../Controllers/cartControllers')
const authUser = require('../Middleware/authUser')

const cartRoutes = express.Router()


cartRoutes.post('/addToCart',authUser, addToCart)
cartRoutes.delete('/removeFromCart',authUser,removeFromCart)
cartRoutes.get('/getCartDetails',authUser,listCart)
cartRoutes.delete('/clearCart',authUser,clearCart)

module.exports = cartRoutes