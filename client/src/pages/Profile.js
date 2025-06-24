import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch profile. Make sure you're logged in.");
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await api.get("/user/recommendations");
        setRecommendations(res.data.recommendations);
      } catch (err) {
        console.error("Failed to fetch recommendations");
      }
    };

    fetchProfile();
    fetchRecommendations();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await api.delete(`/reviews/${reviewId}`);
      setUser((prev) => ({
        ...prev,
        reviews: res.data.reviews,
      }));
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!user) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2">👤 {user.name}</h2>
        <p className="text-gray-600">📧 {user.email}</p>
      </div>

      {/* Favorites */}
      <Section title="❤️ Favorite Movies" items={user.favorites} />

      {/* Watchlist */}
      <Section title="📺 Watchlist" items={user.watchlist} />

      {/* Recommendations with Actions */}
      <Section
        title="🎯 Recommended for You"
        items={recommendations.map((rec) => ({
          ...rec,
          posterPath: rec.poster_path,
          movieId: rec.id, // normalize for Link + backend usage
        }))}
        showActions={true}
      />

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">📝 Your Reviews</h3>
        {user.reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {user.reviews.map((review, idx) => (
              <li
                key={idx}
                className="bg-gray-100 p-3 rounded shadow-sm border-l-4 border-blue-500 relative"
              >
                <p><strong>Movie ID:</strong> {review.movieId}</p>
                <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Reusable section with optional actions
const Section = ({ title, items, showActions = false }) => {
  const handleAdd = async (type, movie) => {
    try {
      await api.post(`/user/${type}`, {
        movieId: movie.movieId,
        title: movie.title,
        posterPath: movie.posterPath,
      });
      alert(`Added to ${type}`);
    } catch (err) {
      alert(`Failed to add to ${type}`);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 italic">No items to display.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition duration-200"
            >
              <Link to={`/movie/${item.movieId}`}>
                {item.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.posterPath}`}
                    alt={item.title}
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </Link>
              <div className="p-3 text-center text-sm font-medium">{item.title}</div>

              {showActions && (
                <div className="flex justify-around mb-3 px-2">
                  <button
                    onClick={() => handleAdd("favorites", item)}
                    className="bg-pink-500 text-white text-xs px-2 py-1 rounded hover:bg-pink-600"
                  >
                    ❤️ Favorite
                  </button>
                  <button
                    onClick={() => handleAdd("watchlist", item)}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                  >
                    📺 Watchlist
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;