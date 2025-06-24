import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">🎬 MovieMate</Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Discover</Link>

        {token ? (
          <>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
            <Link to="/watchlist" className="hover:underline">Watchlist</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="hover:underline text-red-400">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;