import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/user/favorites");
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error("Error fetching favorites");
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      const res = await api.delete(`/user/favorites/${movieId}`);
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error("Error removing favorite");
    }
  };

  const handleClear = async () => {
    try {
      await api.delete("/user/favorites/clear");
      setFavorites([]);
    } catch (err) {
      console.error("Error clearing favorites");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">❤️ Favorite Movies</h2>

      {favorites.length > 0 && (
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-3 py-1 mb-4 rounded"
        >
          Clear All Favorites
        </button>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.length > 0 ? (
          favorites.map((movie, idx) => (
            <div
              key={idx}
              className="border rounded overflow-hidden hover:shadow-md"
            >
              <Link to={`/movie/${movie.movieId}`}>
                {movie.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                    alt={movie.title}
                    className="w-full"
                  />
                ) : (
                  <div className="h-[450px] flex items-center justify-center bg-gray-200">
                    <span>No image</span>
                  </div>
                )}
              </Link>
              <div className="p-2 text-center font-medium">{movie.title}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemove(movie.movieId)}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded mb-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;