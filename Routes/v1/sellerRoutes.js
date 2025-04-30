const express = require('express');
const { createSeller, listSellers, updateSeller, deleteSeller } = require('../../Controllers/sellerControllers');
const authMiddleware = require('../../Middleware/authMiddleware');
const { isAdmin } = require('../../Middleware/checkRole');
const sellerRouter = express.Router();

// Seller Routes
sellerRouter.post("/create", authMiddleware, isAdmin, createSeller);
sellerRouter.get("/list", authMiddleware, isAdmin, listSellers);
sellerRouter.patch("/update/:sellerId", authMiddleware, isAdmin, updateSeller);
sellerRouter.delete("/delete/:sellerId", authMiddleware, isAdmin, deleteSeller);

module.exports = sellerRouter;
