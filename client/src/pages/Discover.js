import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await api.get(`/movies/search?query=${query}`);
      setResults(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch movies.");
      setResults([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎥 Discover Movies</h2>

      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="block border rounded overflow-hidden hover:shadow-md"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full"
              />
            ) : (
              <div className="h-[450px] flex items-center justify-center bg-gray-200">
                <span>No image</span>
              </div>
            )}
            <div className="p-2 text-center font-medium">{movie.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Discover;