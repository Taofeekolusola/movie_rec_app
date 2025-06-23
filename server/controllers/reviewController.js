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

module.exports = {
  postReview,
};