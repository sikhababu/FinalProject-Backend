const express = require('express')
const { register, login } = require('../Controllers/authControllers')

const adminRoutes = express.Router()


adminRoutes.post('/signup',register)
adminRoutes.post('/login',login)


module.exports = adminRoutes