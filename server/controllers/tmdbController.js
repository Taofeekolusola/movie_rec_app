const tmdb = require("../config/tmdb");

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await tmdb.get("/search/movie", {
      params: { query },
    });

    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/movie/popular");
    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await tmdb.get(`/movie/${id}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
};