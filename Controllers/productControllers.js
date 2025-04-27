const productModel = require("../Model/productModel");
const uploadToCloudinary = require("../Utilities/imageUpload");

// Create Product
const createProduct = async (req, res) => {
    try {
        const { title, description, stock, price, category } = req.body;

        if (!title || !description || !stock || !price || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image not found' });
        }

        const cloudinaryRes = await uploadToCloudinary(req.file.path);

        const newProduct = new productModel({
            title,
            description,
            stock,
            price,
            image: cloudinaryRes,
            seller: req.user.id,   // seller is taken from logged-in user
            category
        });

        const savedProduct = await newProduct.save();
        if (savedProduct) {
            return res.status(200).json({ message: "Product added", savedProduct });
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

// List All Products
const listProducts = async (req, res) => {
    try {
        const productList = await productModel.find().populate('category');
        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

// Get Product Details
const productDetails = async (req, res) => {
    try {
        const { productId } = req.params;

        const productDetails = await productModel.findById(productId).populate('category');
        if (!productDetails) {
            return res.status(400).json({ error: "Product not found" });
        }

        return res.status(200).json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, description, stock, price, category } = req.body;

        let imageUrl;

        const isProductExist = await productModel.findById(productId);
        if (!isProductExist) {
            return res.status(400).json({ error: "Product not found" });
        }

        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path);
            imageUrl = cloudinaryRes;
        }

        const updatedFields = {
            title,
            description,
            stock,
            price,
            category: category || isProductExist.category // keep old category if not passed
        };

        if (imageUrl) {
            updatedFields.image = imageUrl;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedFields, { new: true }).populate('category');

        res.status(200).json({ message: 'Product Updated', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(400).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted", deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

//list products by category 

const listProductsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params; // assuming you're sending categoryId in the URL params
  
      if (!categoryId) {
        return res.status(400).json({ error: "Category ID is required" });
      }
  
      const products = await productModel.find({ category: categoryId }).populate('category');
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  };

module.exports = {
    createProduct,
    listProducts,
    productDetails,
    updateProduct,
    deleteProduct,
    listProductsByCategory
};
