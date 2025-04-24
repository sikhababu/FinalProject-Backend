
// If you want to calculate average ratings

const productModel = require("../Model/productModel");
const ReviewModel = require("../Model/reviewModel");

// Add a review
const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    // Validate product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user has already reviewed
    const existingReview = await ReviewModel.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this product" });
    }

    // Create review
    const review = new ReviewModel({
      user: userId,
      product: productId,
      rating,
      comment
    });

    const savedReview = await review.save();

    res.status(201).json({ message: "Review added successfully", review: savedReview });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ product: productId })
      .populate('user', 'name email') // Or just 'name'
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

module.exports = {
  addReview,
  getProductReviews
};
