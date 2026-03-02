import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiArrowLeft, FiShield, FiCpu } from "react-icons/fi";

const TicketPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    grpno: "",
    email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "DEPLOY-QUERY-99";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#e3ff00"; // Lemon Yellow
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // fill email from localStorage (set on login) or from cookie as fallback
  const getCookie = (name) => {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(name + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : "";
  };

  useEffect(() => {
    const stored = localStorage.getItem("userEmail") || getCookie("email");
    if (stored) setFormData((p) => ({ ...p, email: stored }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, ...payload } = formData;
      await axiosInterceptor.post("/user/createTicket", payload);
      showToast("Transmission Successful", "success");

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);

      setTimeout(() => {
        navigate("/user/home");
      }, 4000);
    } catch (error) {
      showToast("Transmission Failed: Hardware Error", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-lemon selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/[0.02] border border-white/5 rounded-[40px] p-12 backdrop-blur-3xl shadow-2xl relative z-10 overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-lemon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-lemon rounded-3xl mb-8 shadow-[0_0_30px_rgba(227,255,0,0.2)]">
            <FiCpu className="text-black text-3xl" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
            Initialize <span className="text-lemon">Ticket</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
            Secure Transmission Protocol • Requesting Support Vector
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 uppercase tracking-widest">
              <label className="text-[10px] font-black text-gray-500 pl-2">Subject Handle</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="OPERATOR NAME"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-lemon transition-all font-bold placeholder:text-gray-700"
                required
              />
            </div>
            <div className="space-y-2 uppercase tracking-widest">
              <label className="text-[10px] font-black text-gray-500 pl-2">Secure Channel</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-sm text-gray-600 font-bold cursor-not-allowed uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 uppercase tracking-widest">
              <label className="text-[10px] font-black text-gray-500 pl-2">Sector ID</label>
              <input
                type="text"
                name="grpno"
                value={formData.grpno}
                onChange={handleChange}
                placeholder="GROUP CODE"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-lemon transition-all font-bold placeholder:text-gray-700"
                required
              />
            </div>
            <div className="space-y-2 uppercase tracking-widest">
              <label className="text-[10px] font-black text-gray-500 pl-2">Transmission Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="QUERY TYPE"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-lemon transition-all font-bold placeholder:text-gray-700"
                required
              />
            </div>
          </div>

          <div className="space-y-2 uppercase tracking-widest">
            <label className="text-[10px] font-black text-gray-500 pl-2">Data Packet Payload</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="DESCRIBE TECHNICAL CHALLENGE..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-lemon transition-all font-bold placeholder:text-gray-700 resize-none"
              required
            />
          </div>

          <div className="pt-4 flex flex-col md:flex-row gap-4 relative z-[60]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 bg-lemon hover:bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 shadow-[0_10px_30px_rgba(227,255,0,0.1)] disabled:opacity-50"
            >
              <FiSend />
              <span>{loading ? "AUTHENTICATING..." : "DEPLOY PACKET"}</span>
            </motion.button>
            <Link
              to="/user/home"
              className="px-10 border border-white/10 hover:bg-white/5 text-gray-500 hover:text-white font-black py-5 rounded-2xl uppercase tracking-widest transition-all flex items-center justify-center"
            >
              <FiArrowLeft className="mr-3" />
              ABORT
            </Link>
          </div>
        </form>

        <AnimatePresence>
          {(loading || submitted) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-12 text-center"
            >
              {loading ? (
                <div className="space-y-8">
                  <div className="relative mx-auto w-24">
                    <div className="w-24 h-24 border-2 border-lemon/20 rounded-full animate-ping absolute inset-0" />
                    <div className="w-24 h-24 border-t-2 border-lemon rounded-full animate-spin flex items-center justify-center text-lemon">
                      <FiShield size={32} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Syncing Data</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Establishing secure link with node</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="w-24 h-24 bg-lemon rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(227,255,0,0.4)]">
                    <FiSend className="text-black text-4xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-lemon">Transmission Complete</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Data packet successfully injected into the network</p>
                  </div>
                  <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest pt-8 transition-opacity duration-300 opacity-50">Redirecting to operations...</div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TicketPage;
