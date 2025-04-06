const express = require('express')
const userRoutes = express.Router()
const authMiddleware = require('../Middleware/authUser')


const {register, userProfile, deleteUser, updateUser} = require('../Controllers/userControllers')
const {loginUser} = require('../Controllers/userControllers')


userRoutes.post('/signup',register)
userRoutes.post('/login',loginUser)
userRoutes.get('/searchuser/:id',authMiddleware,userProfile)
userRoutes.delete('/deleteuser/:userid',authMiddleware,deleteUser)
userRoutes.put('/updateuser/:id',updateUser)


module.exports = userRoutes