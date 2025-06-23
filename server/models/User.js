const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  watchlist: [
    {
      movieId: String, // e.g., TMDB ID
      title: String,
      posterPath: String,
    }
  ],

  favorites: [
    {
      movieId: String,
      title: String,
      posterPath: String,
    }
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);