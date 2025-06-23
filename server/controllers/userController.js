const User = require("../models/User");
const mongoose = require("mongoose");

// Add movie to favorites
const addToFavorites = async (req, res) => {
  const { movieId, title, posterPath } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const alreadyExists = user.favorites.some(movie => movie.movieId === movieId);
    if (alreadyExists) return res.status(400).json({ message: "Movie already in favorites" });

    user.favorites.push({ movieId, title, posterPath });
    await user.save();

    res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add movie to watchlist
const addToWatchlist = async (req, res) => {
  const { movieId, title, posterPath } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const alreadyExists = user.watchlist.some(movie => movie.movieId === movieId);
    if (alreadyExists) return res.status(400).json({ message: "Movie already in watchlist" });

    user.watchlist.push({ movieId, title, posterPath });
    await user.save();

    res.status(200).json({ message: "Added to watchlist", watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate("reviews");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

// Get watchlist
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  const { movieId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(movie => movie.movieId !== movieId);
    await user.save();
    res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};
// Remove from watchlist
const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(movie => movie.movieId !== movieId);
    await user.save();
    res.status(200).json({ message: "Removed from watchlist", watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove watchlist item" });
  }
};
// Clear entire favorites
const clearFavorites = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { favorites: [] } },
      { new: true } // ✅ returns the updated user
    );

    res.status(200).json({ message: "Favorites cleared", favorites: user.favorites });
  } catch (err) {
    console.error("Failed to clear favorites", err);
    res.status(500).json({ error: "Failed to clear favorites" });
  }
};

// Clear entire watchlist
const clearWatchlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { watchlist: [] } },
      { new: true }
    );

    res.status(200).json({ message: "Watchlist cleared", watchlist: user.watchlist });
  } catch (err) {
    console.error("Failed to clear watchlist", err);
    res.status(500).json({ error: "Failed to clear watchlist" });
  }
};


module.exports = {
    addToFavorites,
    addToWatchlist,
    getUserProfile,
    getFavorites,
    getWatchlist,
    removeFromFavorites,
    removeFromWatchlist,
    clearFavorites,
    clearWatchlist
};