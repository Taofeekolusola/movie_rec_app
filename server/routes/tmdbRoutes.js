const express = require("express");
const router = express.Router();
const { searchMovies, getPopularMovies, getMovieDetails } = require("../controllers/tmdbController");

router.get("/search", searchMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovieDetails);

module.exports = router;