import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center relative z-50 shadow">
      <Link to="/" className="font-bold text-xl">
        🎬 MovieMate
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:underline">
          Discover
        </Link>
        {token ? (
          <>
            <Link to="/favorites" className="hover:underline">
              Favorites
            </Link>
            <Link to="/watchlist" className="hover:underline">
              Watchlist
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-xl focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-start px-6 py-4 space-y-3 md:hidden shadow-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">
            Discover
          </Link>
          {token ? (
            <>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="hover:underline">
                Favorites
              </Link>
              <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="hover:underline">
                Watchlist
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:underline">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;