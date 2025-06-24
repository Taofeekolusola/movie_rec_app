import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [minRating, setMinRating] = useState("");
  const [fromYear, setFromYear] = useState("");

 const handleSearch = async (e) => {
  e.preventDefault();

  try {
    const params = {
      sort_by: sortBy || undefined,
      min_rating: minRating || undefined,
      from_year: fromYear || undefined,
    };

    // Only include query if non-empty
    if (query.trim()) params.query = query.trim();

    const res = await api.get("/movies/search", { params });
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

      <form onSubmit={handleSearch} className="mb-6 space-y-4">
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full sm:w-64"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border rounded w-full sm:w-48"
      >
        <option value="">Sort By</option>
        <option value="popularity.desc">Popularity</option>
        <option value="release_date.desc">Release Date</option>
        <option value="vote_average.desc">Rating</option>
      </select>
      <input
        type="number"
        placeholder="Min Rating (e.g., 7)"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        className="p-2 border rounded w-full sm:w-40"
        min="0"
        max="10"
      />
      <input
        type="number"
        placeholder="From Year (e.g., 2015)"
        value={fromYear}
        onChange={(e) => setFromYear(e.target.value)}
        className="p-2 border rounded w-full sm:w-40"
        min="1900"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
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