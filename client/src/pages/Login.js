import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        
        {/* Left Panel */}
        <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10 space-y-4">
          <h2 className="text-4xl font-extrabold">Welcome Back</h2>
          <p className="text-blue-100 text-center text-sm px-4">Log in to explore, rate, and build your movie library!</p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;