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
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(37, 99, 235, 0.15)"; // Soft Blue
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
    const hackathonDate = new Date(2026, 2, 23, 9, 0, 0); // March 23, 2026

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = hackathonDate.getTime() - now.getTime();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

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
    <div className="h-screen bg-bg-deep flex flex-col lg:flex-row overflow-hidden selection:bg-primary selection:text-white font-sans">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 overflow-hidden">
        <div className="w-full max-w-md scale-90 sm:scale-100 origin-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center shadow-primary-glow">
              <span className="text-xl font-black text-white font-tech">QT</span>
            </div>
            <h1 className="text-3xl font-black text-text-main tracking-tighter mb-1 italic font-tech">ACCESS COMMAND</h1>
            <p className="text-text-muted font-bold uppercase tracking-widest text-[10px] leading-relaxed">Enter credentials to initialize session</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-border rounded-[40px] p-8 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 font-bold uppercase tracking-widest text-xs"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full bg-primary hover:bg-secondary text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all shadow-primary-glow flex items-center justify-center disabled:opacity-50"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
              >
                {loading ? <span className="flex items-center"><span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></span>Decoding...</span> : "Execute Login"}
              </motion.button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                New user?{" "}
                <Link
                  to="/user/register"
                  className="text-primary font-black hover:underline decoration-2 underline-offset-4"
                >
                  Create Protocol
                </Link>
              </p>
              <Link
                to="/"
                className="inline-block text-text-muted hover:text-primary text-[8px] font-black uppercase tracking-[0.3em] transition-colors"
              >
                ← Return to Base
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Hackathon Info */}
      <div className="hidden lg:flex flex-1 relative flex-col items-center justify-center text-text-main p-8 bg-bg-deep/50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full opacity-60 pointer-events-none"
        ></canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-bg-deep pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center scale-90 xxl:scale-100"
        >
          <h2 className="text-[10px] font-black text-primary tracking-[0.5em] mb-8 uppercase italic font-tech">Mission Countdown</h2>

          <div className="flex space-x-6 mb-12 justify-center">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="w-20 text-center">
                <div className="text-4xl font-black tracking-tighter mb-1 font-tech border-b-2 border-primary/20 pb-2">{timeLeft[unit] ?? "00"}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-text-muted mt-2">{unit}</div>
              </div>
            ))}
          </div>

          <div className="p-6 border border-border bg-surface shadow-lg rounded-[32px] max-w-xs mx-auto">
            <h3 className="text-[9px] font-black text-primary tracking-[0.3em] mb-4 uppercase font-tech">Latest Achievements</h3>
            <motion.div
              key={winnerIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="text-lg font-black italic text-text-main">{winners[winnerIndex].team}</div>
              <p className="text-[10px] text-text-muted font-medium leading-relaxed">{winners[winnerIndex].desc}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, id, name, type, value, onChange, placeholder, toggleable, onToggle, show }) => (
  <div className="space-y-3 font-bold uppercase tracking-widest relative">
    <label htmlFor={id} className="block text-text-muted text-[10px]">
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
        className="w-full bg-white border border-border rounded-xl px-5 py-4 text-text-main text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-300"
      />
      {toggleable && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
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
