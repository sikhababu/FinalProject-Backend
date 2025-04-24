

const { paymentFunction } = require('../Controllers/paymentControllers')
const authMiddleware = require('../Middleware/authMiddleware')



const paymentRouter = require('express').Router()


paymentRouter.post("/makepayment", authMiddleware, paymentFunction)

module.exports = paymentRouter