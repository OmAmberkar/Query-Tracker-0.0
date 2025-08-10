/* eslint-disable */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [winnerIndex, setWinnerIndex] = useState(0);

  const winners = [
    { team: "Code Titans", desc: "Masters of AI-powered innovation" },
    { team: "Hack Ninjas", desc: "Dominated the 2024 challenge" },
    { team: "Quantum Coders", desc: "Pushed limits of blockchain tech" },
  ];

  // Countdown target: next hackathon date (adjust date here)
  const hackathonDate = new Date("2025-12-15T09:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = hackathonDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate winners every 4 seconds
  useEffect(() => {
    const winnerTimer = setInterval(() => {
      setWinnerIndex((prev) => (prev + 1) % winners.length);
    }, 4000);
    return () => clearInterval(winnerTimer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">QT</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your hackathon account</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></span>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">
                Don't have an account?{" "}
                <Link to="/user/register" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up here
                </Link>
              </p>
              <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Hackathon Info */}
      <div className="flex-1 bg-gradient-to-br from-blue-800 to-blue-600 p-8 flex flex-col items-center justify-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Annual Hackathon Countdown
        </motion.h2>

        {/* Countdown Timer */}
        <div className="flex space-x-4 text-center mb-12">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="bg-white/10 rounded-lg px-4 py-2">
              <div className="text-3xl font-bold">{timeLeft[unit] ?? "--"}</div>
              <div className="text-sm uppercase">{unit}</div>
            </div>
          ))}
        </div>

        {/* Rotating Winners */}
        <motion.div
          key={winnerIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold">{winners[winnerIndex].team}</h3>
          <p className="text-white/80">{winners[winnerIndex].desc}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
