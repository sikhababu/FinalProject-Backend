
const productModel = require("../Model/productModel");
const uploadToCloudinary = require("../Utilities/imageUpload")

const createProduct = async (req, res) => {
    try {

        const { title, description, stock, price } = req.body

        if (!title || !description || !stock || !price) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (!req.file) {
            return res.status(400).json({ error: 'image not found' })
        }

        const cloudinaryRes = await uploadToCloudinary(req.file.path)

        const newProduct = new productModel({
            title, description, stock, price, image: cloudinaryRes
        })

        let savedProduct = await newProduct.save()
        if (savedProduct) {
            return res.status(200).json({ message: "Product added", savedProduct })
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })

    }
}

const listProducts = async (req, res) => {
    try {
        const productList = await productModel.find();

        res.status(200).json(productList)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const productDetails = async (req, res) => {
    try {
        const { productId } = req.params;

        const productDetails = await productModel.findById(productId)
        if (!productDetails) {
            return res.status(400).json({ error: "product not found" })
        }
        return res.status(200).json(productDetails)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, description, stock, price } = req.body
        let imageUrl;

        let isProductExist = await productModel.findById(productId)

        if (!isProductExist) {
            return res.status(400).json({ error: "Product not found" })
        }
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path)
            imageUrl = cloudinaryRes
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, { title, description, stock, price, image: imageUrl }, { new: true })
        res.status(200).json({ messge: 'Product Updated', updatedProduct })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { productId} = req.params
        const deleteProduct = await productModel.findByIdAndDelete(productId)
        if (!deleteProduct) {
            return res.status(400).json({ error: "Product not found" })
        }
        res.status(200).json({ messsage: "Product deleted",deleteProduct })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

module.exports = {
    createProduct,
    listProducts,
    productDetails,
    updateProduct,
    deleteProduct
}