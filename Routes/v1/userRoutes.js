const express = require('express')
const userRoutes = express.Router()

const { register, login, userProfile, deleteUser, updateUser } = require('../../Controllers/authControllers')
const authMiddleware = require('../../Middleware/authMiddleware')
const { isUser } = require('../../Middleware/checkRole')





userRoutes.post('/signup',register)
userRoutes.post('/login', login)
userRoutes.get('/searchuser/:id',authMiddleware,userProfile)
userRoutes.delete('/deleteuser/:userid',authMiddleware, isUser,deleteUser)
userRoutes.put('/updateuser/:id',authMiddleware,isUser, updateUser)


module.exports = userRoutes