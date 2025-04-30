const express = require('express')
const { register, login } = require('../../Controllers/authControllers')
const authMiddleware = require('../../Middleware/authMiddleware')
const { isAdmin } = require('../../Middleware/checkRole')

const adminRoutes = express.Router()


adminRoutes.post('/signup', register)
adminRoutes.post('/login', authMiddleware, isAdmin, login)


module.exports = adminRoutes