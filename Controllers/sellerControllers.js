const UserModel = require('../Model/userModel');
const bcrypt = require('bcrypt');

// Create a new seller
const createSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingSeller = await UserModel.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ error: "Seller with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "seller"
    });

    await newSeller.save();

    res.status(201).json({ message: "Seller created successfully", seller: newSeller });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// List all sellers
const listSellers = async (req, res) => {
  try {
    const sellers = await UserModel.find({ role: 'seller' }).select("-password");
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Update a seller
const updateSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { name, email, password } = req.body;

    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedSeller = await UserModel.findByIdAndUpdate(
      sellerId,
      updateData,
      { new: true }
    );

    if (!updatedSeller || updatedSeller.role !== "seller") {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.status(200).json({ message: "Seller updated successfully", seller: updatedSeller });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Delete a seller
const deleteSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await UserModel.findOneAndDelete({ _id: sellerId, role: "seller" });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.status(200).json({ message: "Seller deleted successfully", seller });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  createSeller,
  listSellers,
  updateSeller,
  deleteSeller
};
