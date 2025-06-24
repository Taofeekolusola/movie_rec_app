const tmdb = require("../config/tmdb");

const searchMovies = async (req, res) => {
  try {
    const { query, sort_by, min_rating, from_year } = req.query;

    const useDiscover = !query || query.trim() === "";

    if (useDiscover) {
      const discoverParams = {
        sort_by: sort_by || "popularity.desc",
        "vote_average.gte": min_rating || 0,
        "primary_release_date.gte": from_year
          ? `${from_year}-01-01`
          : "2000-01-01",
      };

      const discoverRes = await tmdb.get("/discover/movie", {
        params: discoverParams,
      });
      return res.status(200).json(discoverRes.data.results);
    }

    // If query is provided and not empty, search by title
    const searchRes = await tmdb.get("/search/movie", {
      params: {
        query: query.trim(),
        include_adult: false,
      },
    });

    res.status(200).json(searchRes.data.results);
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