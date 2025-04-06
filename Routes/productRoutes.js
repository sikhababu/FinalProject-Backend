const express = require('express')
const productRoutes = express.Router()
const upload = require('../Middleware/multer')


const {createProduct, listProducts, productDetails, updateProduct, deleteProduct} = require('../Controllers/productControllers')
const {getProducts} = require('../Controllers/productControllers')


productRoutes.post("/create", upload.single("image"), createProduct)
productRoutes.get("/list-products", listProducts)
productRoutes.get("/list-product/:productId", productDetails)
productRoutes.patch("/update-product/:productId", upload.single('image'), updateProduct)
productRoutes.delete("/delete-product/:productId", deleteProduct)


module.exports = productRoutes