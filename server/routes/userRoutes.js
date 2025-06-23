const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
    addToFavorites,
    addToWatchlist,
    getUserProfile,
    getFavorites,
    getWatchlist,
    removeFromFavorites,
    removeFromWatchlist,
    clearFavorites,
    clearWatchlist
} = require("../controllers/userController");

router.post("/favorites", auth, addToFavorites);
router.post("/watchlist", auth, addToWatchlist);
router.get("/profile", auth, getUserProfile);
router.get("/favorites", auth, getFavorites);
router.get("/watchlist", auth, getWatchlist);
router.delete("/favorites/:movieId", auth, removeFromFavorites);
router.delete("/watchlist/:movieId", auth, removeFromWatchlist);
router.delete("/favorites/clear", auth, clearFavorites);
router.delete("/watchlist/clear", auth, clearWatchlist);

module.exports = router;