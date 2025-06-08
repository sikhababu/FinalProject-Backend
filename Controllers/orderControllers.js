const CartModel = require("../Model/cartModel");
const OrderModel = require("../Model/orderModel");



const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you get it from auth middleware
    const userAddress = req.user.address; 
    const cart = await CartModel.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderProducts = cart.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const totalAmount = cart.totalPrice;

    const newOrder = new OrderModel({
      user: userId,
      products: orderProducts,
      totalPrice: totalAmount ,
      address : userAddress,
      paymentStatus: 'paid'
      
    });

    await newOrder.save();


    await CartModel.findOneAndUpdate(
      { userId },
      { $set: { products: [], totalPrice: 0 } }
    );
    // Clear cart
    //cart.products = [];
    //cart.totalPrice = 0;
    //await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


const listUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;  

    const orders = await OrderModel.find({ user : userId }).populate("products.productId");
    console.log("orders", orders)
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
console.log("orders", orders)
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await OrderModel.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
   
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


// Get all orders for a seller


const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const orders = await OrderModel.find()
      .populate({
        path: 'products.productId',
        model: 'products',
        match: { seller: sellerId }, // filter at populate level
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    // Filter out orders where no product matches this seller
    const sellerOrders = orders.filter(order =>
      order.products.some(p => p.productId !== null)
    );

    res.json(sellerOrders);
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ error: "Failed to fetch seller orders" });
  }
};



module.exports = {

    createOrder,
    listUserOrders,
    updateOrderStatus,
    getSellerOrders
}