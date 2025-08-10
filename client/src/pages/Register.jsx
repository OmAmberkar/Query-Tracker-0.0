/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [participants, setParticipants] = useState(523); // starting fake count
  const [recent, setRecent] = useState(["Neo_99", "CodeSamurai", "ByteQueen"]);

  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = canvas.offsetWidth;

    const letters = "01HACKTHON@$%#*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF41"; // matrix green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  // Fake participant increment
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) => prev + Math.floor(Math.random() * 3));
      setRecent((prev) => [
        `User${Math.floor(Math.random() * 9999)}`,
        ...prev.slice(0, 6),
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            Join the Hackathon 🚀
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", placeholder: "Full Name" },
              { name: "username", placeholder: "Username" },
              { name: "email", placeholder: "Email" },
              { name: "contact", placeholder: "Contact Number" },
              { name: "password", placeholder: "Password", type: "password" },
              {
                name: "confirmPassword",
                placeholder: "Confirm Password",
                type: "password",
              },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full bg-gray-900 border ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-gray-700 focus:border-blue-500"
                  } rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
                />
                {errors[field.name] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="user">Hackathon Participant</option>
              <option value="admin">Mentor/Organizer</option>
            </select>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: Hackathon Crazy Side */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {/* Canvas Rain */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-green-400">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            Hackathon Live Feed
          </h2>
          <p className="mb-6 text-lg">
            Participants Registered:{" "}
            <span className="text-green-300 font-bold">{participants}</span>
          </p>

          {/* Recent Joiners */}
          <div className="bg-gray-900 bg-opacity-70 rounded-lg p-4 w-64 overflow-hidden">
            <h3 className="text-sm font-semibold mb-2 text-green-300">
              Recent Joiners
            </h3>
            <div className="space-y-1 text-sm">
              {recent.map((user, i) => (
                <p key={i} className="truncate">{user}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
