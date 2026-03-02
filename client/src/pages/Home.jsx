import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion } from "framer-motion";
import { FiActivity, FiClock, FiCheckCircle, FiPlus, FiGrid } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, solved: 0 });
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "QUERYTRACKER0101";
    const fontSize = 16;
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

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const ticketsRes = await axiosInterceptor.get("/user/getTickets", { withCredentials: true });

        const allTickets = ticketsRes.data || [];
        setTickets(allTickets.slice(0, 5));

        const pending = allTickets.filter(t => t.status === "open").length;
        const solved = allTickets.filter(t => t.status === "resolved").length;

        setStats({
          total: allTickets.length,
          pending,
          solved,
        });
      } catch (error) {
        console.error("Error fetching home data:", error);
        showToast("Network Sync Failed", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-lemon selection:text-black">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      />

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-12 pt-28">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center lg:text-left"
          >
            <h1 className="text-6xl font-black italic tracking-tighter mb-4 uppercase mt-10">
              Operational <span className="text-lemon ">Console</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm">
              Real-time monitoring and ticket lifecycle management
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard
              icon={<FiActivity className="text-lemon" />}
              label="Active Queries"
              value={stats.total}
              color="lemon"
            />
            <StatCard
              icon={<FiClock className="text-lemon" />}
              label="Pending Triage"
              value={stats.pending}
              color="lemon"
            />
            <StatCard
              icon={<FiCheckCircle className="text-lemon" />}
              label="Resolved Objectives"
              value={stats.solved}
              color="lemon"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 mb-8 italic">
                Terminal Commands
              </h2>
              <ActionCard
                title="Initialize Ticket"
                desc="Deploy a new query to the network"
                onClick={() => navigate("/user/createTicket")}
                icon={<FiPlus />}
              />
              <ActionCard
                title="Access Archives"
                desc="Review historical ticket data"
                onClick={() => navigate("/user/getTickets")}
                icon={<FiGrid />}
              />
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 italic">
                  Live Feed Activity
                </h2>
                <button
                  onClick={() => navigate("/user/getTickets")}
                  className="text-[10px] font-black uppercase tracking-widest text-lemon hover:text-white transition-colors"
                >
                  View All Log Files →
                </button>
              </div>

              <div className="space-y-4">
                {tickets.length > 0 ? (
                  tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer"
                      onClick={() => navigate("/user/getTickets")}
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-2 h-2 rounded-full bg-lemon animate-pulse shadow-[0_0_8px_#e3ff00]" />
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-lemon transition-colors line-clamp-1">
                            {ticket.subject || ticket.title || "Untitled Query"}
                          </h3>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter mt-1">
                            {ticket.email || ticket.name} • Ref:{" "}
                            {ticket._id?.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === "resolved"
                          ? "bg-lemon/10 text-lemon border border-lemon/20"
                          : "bg-white/5 text-gray-400 border border-white/10"
                          }`}
                      >
                        {ticket.status}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-700">
                      No active transmissions detected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group backdrop-blur-xl"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-lemon opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10">
      <div className="p-4 bg-black/50 border border-white/5 rounded-2xl inline-block mb-6 shadow-xl">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div className="text-5xl font-black italic tracking-tighter mb-2">
        {value}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 leading-none">
        {label}
      </div>
    </div>
  </motion.div>
);

const ActionCard = ({ title, desc, onClick, icon }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full text-left p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-lemon/50 transition-all shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-lemon transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
    <div className="flex items-center space-x-6">
      <div className="p-4 bg-lemon text-black rounded-2xl shadow-[0_0_20px_rgba(227,255,0,0.2)]">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-lemon transition-colors">
          {title}
        </h3>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter mt-1">
          {desc}
        </p>
      </div>
    </div>
  </motion.button>
);

export default Home;
