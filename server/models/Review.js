const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  movieId: {
    type: String, // TMDB movie ID
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },

  comment: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);