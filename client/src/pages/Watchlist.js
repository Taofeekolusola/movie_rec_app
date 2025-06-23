import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await api.get("/user/watchlist");
        setWatchlist(res.data.watchlist);
      } catch (err) {
        console.error("Error fetching watchlist");
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      const res = await api.delete(`/user/watchlist/${movieId}`);
      setWatchlist(res.data.watchlist);
    } catch (err) {
      console.error("Error removing watchlist item");
    }
  };

  const handleClear = async () => {
    try {
      const res = await api.delete("/user/watchlist/clear");
      console.log("Response from server:", res.data);
      setWatchlist(res.data.watchlist); // This will now be []
    } catch (err) {
      console.error("Error clearing watchlist");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📺 Watchlist</h2>

      {watchlist.length > 0 && (
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-3 py-1 mb-4 rounded"
        >
          Clear All Watchlist
        </button>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlist.length > 0 ? (
          watchlist.map((movie, idx) => (
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
          <p>No watchlist movies yet.</p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;