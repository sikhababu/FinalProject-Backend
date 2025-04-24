const express = require('express');
const { createSeller, listSellers, updateSeller, deleteSeller } = require('../Controllers/sellerControllers');
const sellerRouter = express.Router();

// Seller Routes
sellerRouter.post("/create", createSeller);
sellerRouter.get("/list", listSellers);
sellerRouter.patch("/update/:sellerId", updateSeller);
sellerRouter.delete("/delete/:sellerId", deleteSeller);

module.exports = sellerRouter;
