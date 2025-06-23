import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to fetch movie details");
      }
    };

    fetchMovie();
  }, [id]);

  const addToFavorites = async () => {
  console.log("🔁 Add to Favorites clicked"); // Debug log
  try {
    await api.post("/user/favorites", {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    });
    setMessage("Added to favorites 🎉");
  } catch (err) {
    console.error(err.response?.data || err.message); // Show exact error
    setMessage("Already in favorites or error occurred.");
  }
};

const addToWatchlist = async () => {
  console.log("🔁 Add to Watchlist clicked"); // Debug log
  try {
    await api.post("/user/watchlist", {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    });
    setMessage("Added to watchlist ✅");
  } catch (err) {
    console.error(err.response?.data || err.message);
    setMessage("Already in watchlist or error occurred.");
  }
};

  const postReview = async e => {
    e.preventDefault();
    try {
      await api.post("/reviews", {
        movieId: movie.id,
        rating: review.rating,
        comment: review.comment,
      });
      setMessage("Review submitted ✍️");
      setReview({ rating: "", comment: "" });
    } catch (err) {
      setMessage("Error posting review.");
    }
  };

  if (!movie) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded"
          />
        )}
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="mb-2 text-gray-600">{movie.overview}</p>
          <p className="font-semibold">⭐ Rating: {movie.vote_average}</p>
          <div className="mt-4 space-x-2">
            <button onClick={addToFavorites} className="bg-blue-600 text-white px-4 py-1 rounded">
              Add to Favorites
            </button>
            <button onClick={addToWatchlist} className="bg-purple-600 text-white px-4 py-1 rounded">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">✍️ Leave a Review</h3>
        <form onSubmit={postReview} className="space-y-2">
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={e => setReview({ ...review, rating: e.target.value })}
            placeholder="Rating (0-10)"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="comment"
            value={review.comment}
            onChange={e => setReview({ ...review, comment: e.target.value })}
            placeholder="Your comment"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
            Submit Review
          </button>
        </form>
        {message && <p className="text-blue-600 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default MovieDetails;