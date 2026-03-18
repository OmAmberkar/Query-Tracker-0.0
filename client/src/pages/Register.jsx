/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const sampleUsers = [
  "CyberNinja", "ByteWizard", "CodeSurfer", "AlgoQueen", "HackGuru",
  "PixelPirate", "DataSage", "QuantumByte", "NullPointer", "ScriptKid",
  "BitCrusher", "StackRider", "LogicLord", "CryptoMage", "BugHunter"
];

function useLiveParticipants() {
  const [participants, setParticipants] = useState(523);
  const [recent, setRecent] = useState(["Neo_99", "CodeSamurai", "ByteQueen"]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment participants randomly by 1-5 to simulate bursts
      setParticipants((prev) => prev + Math.floor(Math.random() * 5) + 1);

      // Add 1 or 2 new joiners randomly
      const newJoinersCount = Math.floor(Math.random() * 2) + 1;
      const newJoiners = [];

      for (let i = 0; i < newJoinersCount; i++) {
        // Pick random username from sampleUsers and append random number
        const user =
          sampleUsers[Math.floor(Math.random() * sampleUsers.length)] +
          Math.floor(Math.random() * 9999);
        newJoiners.push(user);
      }

      setRecent((prev) => {
        // Add new joiners at the start and keep max 7 recent
        const updated = [...newJoiners, ...prev].slice(0, 7);
        return updated;
      });
    }, 3000 + Math.random() * 2000); // Interval varies 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return { participants, recent };
}


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    teamName: "",
    contact: "",
    password: "",
    confirmPassword: "",
    isAdminRequested: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { participants, recent } = useLiveParticipants();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.height = window.innerHeight;
    canvas.width = canvas.offsetWidth;

    const letters = "0101QUERYTRACKER@#$";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(37, 99, 235, 0.15)";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.teamName.trim()) newErrors.teamName = "Team Name is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await axiosInterceptor.post("/user/register", formData);
      if (res.status === 201 || res.data?.status === "success") {
        toast.success(res.data.message);
        navigate("/user/login");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data?.message || "Conflict: Network channel busy.");
      } else {
        toast.error(err.response?.data?.message || "Protocol Failure: Sync rejected.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row selection:bg-primary selection:text-white overflow-hidden bg-bg-deep font-sans text-[11px]">
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-surface border border-border rounded-[40px] p-8 shadow-2xl relative group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

          <h1 className="text-3xl font-black text-text-main mb-6 italic tracking-tighter font-tech uppercase">
            INITIALIZE <span className="text-primary">PROTOCOL</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "name", placeholder: "Full Name" },
                { name: "username", placeholder: "Codename" },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full bg-white border ${errors[field.name] ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                  />
                  {errors[field.name] && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors[field.name]}</p>}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Network Email"
                  className={`w-full bg-white border ${errors.email ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                />
                {errors.email && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Group / Team Name"
                  className={`w-full bg-white border ${errors.teamName ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                />
                {errors.teamName && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors.teamName}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Vector"
                  className={`w-full bg-white border ${errors.contact ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                />
                {errors.contact && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors.contact}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative space-y-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Key"
                  className={`w-full bg-white border ${errors.password ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-text-muted cursor-pointer hover:text-primary transition-colors">
                  {showPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                </span>
                {errors.password && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors.password}</p>}
              </div>

              <div className="relative space-y-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Verify"
                  className={`w-full bg-white border ${errors.confirmPassword ? "border-error" : "border-border focus:border-primary"} rounded-xl px-4 py-3 text-text-main focus:outline-none transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest`}
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-text-muted cursor-pointer hover:text-primary transition-colors">
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                </span>
                {errors.confirmPassword && <p className="text-error text-[8px] font-bold mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-bg-deep rounded-xl border border-border/50">
              <input 
                type="checkbox" 
                id="isAdminRequested"
                name="isAdminRequested"
                checked={formData.isAdminRequested}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-border bg-white" 
              />
              <label htmlFor="isAdminRequested" className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted cursor-pointer hover:text-primary transition-colors">
                Request System Elevation (Admin Permissions)
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-primary text-white hover:bg-secondary font-black rounded-xl py-4 uppercase tracking-[0.2em] transition-all shadow-primary-glow flex items-center justify-center disabled:opacity-50 mt-2"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              disabled={loading}
            >
              {loading ? "INITIALIZING..." : "JOIN NETWORK"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/user/login" className="text-primary font-black uppercase tracking-[0.2em] hover:underline decoration-2 underline-offset-4">
              Return to Login Sequence
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-bg-deep/50 overflow-hidden text-center">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none"></canvas>
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-text-main scale-90">
          <h2 className="text-[10px] font-black text-primary tracking-[0.5em] mb-8 uppercase italic font-tech">Live Network Pulse</h2>
          <div className="mb-8 font-tech italic">
            <div className="text-6xl font-black tracking-tighter mb-1 border-b-2 border-primary/20 pb-2">{participants}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mt-2">Units Active in sector</div>
          </div>
          <div className="p-6 border border-border bg-surface shadow-xl rounded-[32px] w-full max-w-xs">
            <h3 className="text-[9px] font-black text-primary tracking-[0.3em] mb-4 uppercase font-tech">New Arrivals</h3>
            <div className="space-y-2 font-bold uppercase tracking-widest text-[9px] text-text-muted">
              {recent.map((user, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-text-main">{user}</span>
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
