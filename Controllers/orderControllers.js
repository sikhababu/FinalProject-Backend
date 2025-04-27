const OrderModel = require("../Model/orderModel");


const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, address } = req.body;
    const userId = req.user.id;

    const newOrder = new OrderModel({
      user: userId,
      products,
      totalPrice,
      address
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
const listUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.find({ user: userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
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
    const sellerId = req.user.id; // Assuming seller is logged in
    const orders = await Order.find({ "products.seller": sellerId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seller orders" });
  }
};

module.exports = {

    createOrder,
    listUserOrders,
    updateOrderStatus,
    getSellerOrders
}