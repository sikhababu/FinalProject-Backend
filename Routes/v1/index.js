const adminRoutes = require('./adminRoutes')
const cartRoutes = require('./cartRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./orderRoutes')
const paymentRouter = require('./paymentRoutes')
const productRoutes = require('./productRoutes')
const sellerRouter = require('./sellerRoutes')
const userRoutes = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRoutes)
v1Router.use("/admin", adminRoutes)
v1Router.use("/product", productRoutes)
v1Router.use("/cart", cartRoutes)
v1Router.use("/payment", paymentRouter)
v1Router.use("/seller", sellerRouter)
v1Router.use("/category", categoryRoutes)
v1Router.use("/order", orderRoutes)


module.exports = v1Router