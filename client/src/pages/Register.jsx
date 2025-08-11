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
    contact: "",
    password: "",
    confirmPassword: "",
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
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = canvas.offsetWidth;

    const letters = "HACKTHON@123$%#*@$%&#";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF41";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axiosInterceptor.post("/user/register", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        contact: formData.contact,
        password: formData.password,
        role :"user",
      });

      if (res.status === 201 || res.data?.status === "success") {
        navigate("/user/home");
        toast.success("Registration successful! ");
      }
    } catch (err) {
      if (err.response?.status === 409 || err.response?.status === 400) {
        toast.error(err.response.data?.message || "Username or Email already taken.");
        navigate("/user/login");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center bg-black p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-gray-900 rounded-2xl border border-blue-400 p-8 shadow-[0px_0px_20px_0px_blue]"
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            Join the Hackathon
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {[ 
              { name: "name", placeholder: "Full Name" },
              { name: "username", placeholder: "Username" },
              { name: "email", placeholder: "Email" },
              { name: "contact", placeholder: "Contact Number" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full bg-black border ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-gray-700 focus:border-blue-400"
                  } rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
                />
                {errors[field.name] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full bg-black border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-700 focus:border-blue-500"
                } rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full bg-black border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-700 focus:border-blue-500"
                } rounded-lg px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

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
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
          <h2 className="text-4xl font-bold mb-4 ">
            Hackathon Live Feed
          </h2>
          <p className="mb-6 text-lg">
            Participants Registered:{" "}
            <span className="text-white font-bold animate-pulse">{participants}</span>
          </p>
          <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 w-64 overflow-hidden">
            <h3 className="text-sm text-center font-semibold mb-2 text-green-300">
              Recent Joiners
            </h3>
            <div className="space-y-1 text-sm">
              {recent.map((user, i) => (
                <p key={i} className="truncate animate-pulse">{user}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
