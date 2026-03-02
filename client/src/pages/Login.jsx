/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [winnerIndex, setWinnerIndex] = useState(0);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const winners = [
    { team: "Code Titans", desc: "Masters of AI-powered innovation" },
    { team: "Hack Ninjas", desc: "Dominated the 2024 challenge" },
    { team: "Quantum Coders", desc: "Pushed limits of blockchain tech" },
  ];

  /** ================== Matrix Rain Effect ================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = canvas.offsetWidth;

    const letters = "HACKTHON@123$%#*@$%&#";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#e3ff00"; // Lemon Yellow
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  /** ================== Countdown Logic ================== */
  useEffect(() => {
    const hackathonDate = new Date("2025-12-15T09:00:00");

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

  /** ================== Winner Rotation ================== */
  useEffect(() => {
    const winnerTimer = setInterval(() => {
      setWinnerIndex((prev) => (prev + 1) % winners.length);
    }, 4000);
    return () => clearInterval(winnerTimer);
  }, []);

  /** ================== Handlers ================== */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInterceptor.post(
        "/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Login Successful");

        // Save user info
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userRole", res.data.role);

        if (res.data.role === "admin") {
          navigate("/user/home"); // Or a specific admin page if we choose
        } else {
          navigate("/user/home");
        }

      } else {
        toast.warn(res.data.message || "Login failed");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      if (error.response && error.response.status === 401) {
        navigate("/user/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /** ================== UI ================== */
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden selection:bg-lemon selection:text-black">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-lemon rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(227,255,0,0.2)]">
              <span className="text-2xl font-black text-black">QT</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">ACCESS COMMAND</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs leading-relaxed">Enter credentials to initialize session</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-lemon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <InputField
                label="Identifier / Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="system@querytracker.io"
              />

              <InputField
                label="Security Key"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                toggleable
                onToggle={() => setShowPassword(!showPassword)}
                show={showPassword}
              />

              <motion.button
                type="submit"
                className="w-full bg-lemon hover:bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(227,255,0,0.1)] flex items-center justify-center disabled:opacity-50"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
              >
                {loading ? <span className="flex items-center"><span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></span>Decoding...</span> : "Execute Login"}
              </motion.button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                New user?{" "}
                <Link
                  to="/user/register"
                  className="text-lemon hover:underline decoration-2 underline-offset-4"
                >
                  Create Protocol
                </Link>
              </p>
              <Link
                to="/"
                className="inline-block text-gray-700 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
              >
                ← Return to Base
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Hackathon Info */}
      <div className="flex-1 relative flex flex-col items-center justify-center text-white p-8">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full opacity-40"
        ></canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-sm font-black text-lemon tracking-[0.5em] mb-12 uppercase italic">Mission Countdown</h2>

          <div className="flex space-x-6 mb-16">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="w-24 text-center">
                <div className="text-5xl font-black tracking-tighter mb-1">{timeLeft[unit] ?? "00"}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{unit}</div>
              </div>
            ))}
          </div>

          <div className="p-8 border border-white/5 bg-black/50 backdrop-blur-md rounded-2xl max-w-xs mx-auto">
            <h3 className="text-[10px] font-black text-lemon tracking-[0.3em] mb-4 uppercase">Latest Achievements</h3>
            <motion.div
              key={winnerIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="text-xl font-black italic">{winners[winnerIndex].team}</div>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{winners[winnerIndex].desc}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, id, name, type, value, onChange, placeholder, toggleable, onToggle, show }) => (
  <div className="space-y-3 font-bold uppercase tracking-widest relative">
    <label htmlFor={id} className="block text-gray-500 text-[10px]">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-lemon focus:ring-1 focus:ring-lemon/50 transition-all placeholder:text-gray-800"
      />
      {toggleable && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-lemon transition-colors"
        >
          {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      )}
    </div>
  </div>
);

// Remove the separate LoadingSpinner component as it's now inline or we should use the shared one if it existed.
// Since I created LoadingSpinner.jsx, but it's a page-level spinner, I'll just keep it inline here for symmetry with other pages.


export default Login;
