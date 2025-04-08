const CartModel = require("../Model/cartModel")
const productModel = require("../Model/productModel")


const addToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
  
      if (!productId || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
      }
  
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }
  
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        cart = new CartModel({ userId, products: [] });
      }
  
      // Check if product already exists in cart
      const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));
  
      if (existingProductIndex !== -1) {
        // Update quantity if product already in cart
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product
        cart.products.push({
          productId,
          price: product.price,
          quantity
        });
      }
  
      cart.calculateTotalPrice();
      const cartSaved = await cart.save();
  
      return res.status(200).json({ message: "Product added to cart", cart: cartSaved });
  
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
  };


const listCart = async (req, res) => {
    try {
        const userId = req.user.id
        
        const cart = await CartModel.findOne({userId}).populate("products.productId")
        if(!cart){

            return res.status(400).json({ error: "cart not found" })
           }


           return res.status(200).json({ message: "cart fetched", cart })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}


const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId } = req.body

        let cart = await CartModel.findOne({userId})

        if(!cart){

            return res.status(400).json({ error: "cart not found" })
           }

        cart.products = cart.products.filter((item)=>!item.productId.equals(productId))

        cart.calculateTotalPrice()
        let cartSaved = await cart.save()
       
    return res.status(200).json({ message: "Product removed from cart", cartSaved })
      
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId } = req.body

        let cart = await CartModel.findOne({userId})

        if(!cart){

            return res.status(400).json({ error: "cart not found" })
           }

        cart.products = []

        cart.calculateTotalPrice()
        let cartSaved = await cart.save()
       
    return res.status(200).json({ message: "Product removed from cart", cartSaved })
      
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    listCart,
    clearCart
}