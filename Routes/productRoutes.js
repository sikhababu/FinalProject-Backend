const express = require('express')
const productRoutes = express.Router()
const upload = require('../Middleware/multer')


const {createProduct, listProducts, productDetails, updateProduct, deleteProduct} = require('../Controllers/productControllers')
const {getProducts} = require('../Controllers/productControllers')
const authMiddleware = require('../Middleware/authMiddleware')


productRoutes.post("/create",authMiddleware, upload.single("image"), createProduct)
productRoutes.get("/list-products", listProducts)
productRoutes.get("/list-product/:productId", productDetails)
productRoutes.patch("/update-product/:productId", authMiddleware, upload.single('image'), updateProduct)
productRoutes.delete("/delete-product/:productId", authMiddleware, deleteProduct)


module.exports = productRoutes