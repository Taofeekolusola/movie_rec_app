import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-3 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 text-sm">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <h2 className="text-white font-semibold text-base">🎬 MovieMate</h2>
          <p className="text-gray-400 text-xs">Your Movie Companion</p>
        </div>

        {/* Navigation */}
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link to="/" className="hover:text-white">Discover</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-white">Profile</Link>
          </li>
        </ul>

        {/* Socials */}
        <div className="flex space-x-3 justify-center">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaGithub /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-2">
        &copy; {new Date().getFullYear()} MovieMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;