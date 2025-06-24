import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h2 className="text-lg font-semibold text-white">🎬 MovieMate</h2>
          <p className="text-sm text-gray-400">Your Movie Companion</p>
        </div>

        {/* Navigation */}
        <ul className="flex space-x-4 text-sm mb-2 md:mb-0">
          <li><Link to="/" className="hover:text-white">Discover</Link></li>
          <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
        </ul>

        {/* Socials */}
        <div className="flex space-x-3">
          <a href="#" className="hover:text-white text-sm"><FaFacebookF /></a>
          <a href="#" className="hover:text-white text-sm"><FaTwitter /></a>
          <a href="#" className="hover:text-white text-sm"><FaInstagram /></a>
          <a href="#" className="hover:text-white text-sm"><FaGithub /></a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-2">
        &copy; {new Date().getFullYear()} MovieMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;