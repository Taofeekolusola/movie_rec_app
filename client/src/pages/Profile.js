import React, { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
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

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">🎬 Favorites</h3>
      <ul className="list-disc pl-6">
        {user.favorites.map((fav, idx) => (
          <li key={idx}>{fav.title}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">📺 Watchlist</h3>
      <ul className="list-disc pl-6">
        {user.watchlist.map((movie, idx) => (
          <li key={idx}>{movie.title}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">📝 Reviews</h3>
      <ul className="list-disc pl-6">
        {user.reviews.length === 0 ? (
          <li>No reviews yet.</li>
        ) : (
          user.reviews.map((review, idx) => (
            <li key={idx}>Movie ID: {review.movieId}, Rating: {review.rating}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Profile;