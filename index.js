const express = require('express')
require('dotenv').config();
const app = express()
const userRoutes = require ('./Routes/v1/userRoutes')
const {connectDB} = require ('./Config/dbConnection')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const apiRouter = require('./Routes');




//db connection
connectDB()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL
}))



//app.use('/user', userRoutes)
//app.use('/admin', adminRoutes)
//app.use('/product', productRoutes)
//app.use('/cart', cartRoutes)
//app.use('/payment', paymentRouter)
//app.use('/seller', sellerRouter)
//app.use('/category', categoryRoutes);
//app.use('/order', orderRoutes);

app.get("/", (req,res) => [
res.json("Hello World")

])

app.use("/api", apiRouter)

app.listen(process.env.PORT,()=>{

   console.log(`server starts on port ${process.env.PORT}`)
})

