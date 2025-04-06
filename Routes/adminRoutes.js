const express = require('express')
const { register, loginAdmin, logoutAdmin } = require('../Controllers/adminControllers')
const adminRoutes = express.Router()


adminRoutes.post('/signup',register)
adminRoutes.post('/login',loginAdmin)
adminRoutes.post('/logout',logoutAdmin)

module.exports = adminRoutes