const Review = require("../models/Review");
const User = require("../models/User");

// Post a movie review
const postReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;

  try {
    const review = new Review({
      user: req.user.id,
      movieId,
      rating,
      comment,
    });

    await review.save();

    // Add the review to the user's reviews array
    const user = await User.findById(req.user.id);
    user.reviews.push(review._id);
    await user.save();

    // Only respond after all operations succeed
    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/user/reviews/:reviewId
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    // Delete the review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    // Also remove the reference from the User
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { reviews: reviewId } },
      { new: true }
    ).populate("reviews");

    res.status(200).json({ message: "Review deleted", reviews: user.reviews });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = {
  postReview,
  deleteReview
};