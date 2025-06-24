import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        
        {/* Left Panel */}
        <div className="md:w-1/2 bg-purple-600 text-white flex flex-col justify-center items-center p-10 space-y-4">
          <h2 className="text-4xl font-extrabold">Join the Club</h2>
          <p className="text-purple-100 text-center text-sm px-4">Register to track your favorite movies and create a personalized watchlist!</p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border border-gray-300 rounded px-4 py-3 bg-gray-50">
              <FaUser className="text-gray-400 mr-3" />
              <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-4 py-3 bg-gray-50">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-4 py-3 bg-gray-50">
              <FaLock className="text-gray-400 mr-3" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition-all"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;