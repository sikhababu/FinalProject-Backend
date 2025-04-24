const express = require('express')
const userRoutes = express.Router()

const { register, login, userProfile, deleteUser, updateUser } = require('../Controllers/authControllers')
const authMiddleware = require('../Middleware/authMiddleware')





userRoutes.post('/signup',register)
userRoutes.post('/login',login)
userRoutes.get('/searchuser/:id',authMiddleware,userProfile)
userRoutes.delete('/deleteuser/:userid',authMiddleware,deleteUser)
userRoutes.put('/updateuser/:id',updateUser)


module.exports = userRoutes