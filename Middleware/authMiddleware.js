const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized - token missing" });
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(401).json({ error: "Invalid or incomplete token" });
    }

    // Optionally fetch full user (if needed)
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      address: user.address,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized action: please login" });
  }
};

module.exports = authMiddleware
