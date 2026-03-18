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
    teamName: "",
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
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(37, 99, 235, 0.1)"; // Soft Blue
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInterceptor.get("/user/profile");
        if (res.data.success) {
          setFormData(p => ({
            ...p,
            email: res.data.user.email,
            teamName: res.data.user.teamName,
            name: res.data.user.name
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to localStorage if profile fetch fails
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) setFormData(p => ({ ...p, email: storedEmail }));
      }
    };
    fetchUserProfile();
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
    <div className="h-screen bg-bg-deep text-text-main flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary selection:text-white">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-surface border border-border rounded-[40px] p-8 backdrop-blur-3xl shadow-2xl relative z-10 overflow-hidden group scale-90 xxl:scale-100"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4 shadow-primary-glow">
            <FiCpu className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-1 font-tech text-text-main">
            Initialize <span className="text-primary">Ticket</span>
          </h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-[9px]">
            Secure Transmission Protocol • Requesting Support Vector
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 uppercase tracking-widest">
              <label className="text-[9px] font-black text-text-muted pl-2 uppercase">User Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="OPERATOR NAME"
                className="w-full bg-white border border-border rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest"
                required
              />
            </div>
            <div className="space-y-1.5 uppercase tracking-widest">
              <label className="text-[9px] font-black text-text-muted pl-2 uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-bg-deep border border-border rounded-xl px-5 py-3 text-xs text-text-muted font-bold cursor-not-allowed uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="space-y-1.5 uppercase tracking-widest">
            <label className="text-[9px] font-black text-text-muted pl-2 uppercase">Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              readOnly
              className="w-full bg-bg-deep border border-border rounded-xl px-5 py-3 text-xs text-text-muted font-bold cursor-not-allowed uppercase tracking-widest"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 uppercase tracking-widest">
              <label className="text-[9px] font-black text-text-muted pl-2 uppercase">Room Number</label>
              <input
                type="text"
                name="grpno"
                value={formData.grpno}
                onChange={handleChange}
                placeholder="Eg. 05"
                className="w-full bg-white border border-border rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest"
                required
              />
            </div>
            <div className="space-y-1.5 uppercase tracking-widest">
              <label className="text-[9px] font-black text-text-muted pl-2 uppercase">Subject (Atleast 3 words)</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="eg. Charging port not working"
                className="w-full bg-white border border-border rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 uppercase tracking-widest">
            <label className="text-[9px] font-black text-text-muted pl-2 uppercase">Description (Atleast 10 words)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="DESCRIBE TECHNICAL CHALLENGE..."
              className="w-full bg-white border border-border rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-300 resize-none uppercase tracking-widest"
              required
            />
          </div>

          <div className="pt-4 flex flex-col md:flex-row gap-4 relative z-[60]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-secondary text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 shadow-primary-glow disabled:opacity-50"
            >
              <FiSend size={14} />
              <span className="text-[11px] font-black">{loading ? "AUTHENTICATING..." : "DEPLOY QUERY"}</span>
            </motion.button>
            <Link
              to="/user/home"
              className="px-10 border border-border hover:bg-bg-deep text-text-muted hover:text-text-main font-black py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center shadow-sm text-[11px]"
            >
              <FiArrowLeft className="mr-3" />
               ABORT QUERY
            </Link>
          </div>
        </form>

        <AnimatePresence>
          {(loading || submitted) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-surface flex flex-col items-center justify-center p-12 text-center"
            >
              {loading ? (
                <div className="space-y-8">
                  <div className="relative mx-auto w-24">
                    <div className="w-24 h-24 border-2 border-primary/20 rounded-full animate-ping absolute inset-0" />
                    <div className="w-24 h-24 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center text-primary">
                      <FiShield size={32} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 font-tech text-text-main">Syncing Data</h2>
                    <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Establishing secure link with node</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-primary-glow">
                    <FiSend className="text-white text-4xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-primary font-tech">Transmission Complete</h2>
                    <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-[10px]">Data packet successfully injected into the network</p>
                  </div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-8 transition-opacity duration-300 opacity-50">Redirecting to operations...</div>
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
