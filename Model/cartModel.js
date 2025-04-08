const mongoose = require('mongoose');

// Defining a schema for a cart
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref:'users',
    required: true
  },

  products:[
  {
  productId: {
    type: mongoose.Types.ObjectId,
    ref:'products',
    required: true,
   
  },
  price: {
    type: Number,
    required: true
   
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  
  }

}],


  totalPrice: {
    type: Number,
    required: true,
    default:0
   
  }

}, {timestamps:true});


cartSchema.methods.calculateTotalPrice = function () {

  this.totalPrice= this.products.reduce((total,product) =>total += product.price * product.quantity,0)
}

// Creating a model from the schema
const CartModel = mongoose.model('cart', cartSchema);

module.exports= CartModel