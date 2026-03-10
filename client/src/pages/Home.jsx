import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion } from "framer-motion";
import { FiActivity, FiClock, FiCheckCircle, FiPlus, FiGrid } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".home-title", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
      .from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6")
      .from(".action-card", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4")
      .from(".feed-title", {
        opacity: 0,
        duration: 0.5
      }, "-=0.4")
      .from(".ticket-item", {
        x: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

  }, { scope: container });

  if (loading) return <LoadingSpinner />;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-primary/10 text-primary border-primary/20';
      case 'in progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'closed': return 'bg-text-muted/10 text-text-muted border-text-muted/20';
      default: return 'bg-text-muted/10 text-text-muted border-text-muted/20';
    }
  };

  return (
    <div ref={container} className="h-screen bg-bg-deep text-text-main relative overflow-hidden font-sans selection:bg-primary selection:text-white flex flex-col">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-6 pt-24 pb-6 overflow-hidden flex flex-col w-full">
          {/* Hero Section - Compact */}
          <div className="home-title mb-8 text-center lg:text-left shrink-0">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 uppercase font-tech">
              Operational <span className="text-primary">Console</span>
            </h1>
            <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-[10px]">
              Real-time monitoring and ticket lifecycle management
            </p>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
            {/* Left Column: Stats and Actions */}
            <div className="lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              {/* Stats Grid - Vertical and Compact */}
              <div className="grid grid-cols-1 gap-4 shrink-0">
                <StatCard
                  className="stat-card"
                  icon={<FiActivity className="text-primary" />}
                  label="Active Queries"
                  value={stats.total}
                  color="primary"
                />
                <StatCard
                  className="stat-card"
                  icon={<FiClock className="text-primary" />}
                  label="Pending Triage"
                  value={stats.pending}
                  color="primary"
                />
                <StatCard
                  className="stat-card"
                  icon={<FiCheckCircle className="text-primary" />}
                  label="Resolved Objectives"
                  value={stats.solved}
                  color="primary"
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-4 shrink-0">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-text-muted mb-4 italic font-tech">
                  Terminal Commands
                </h2>
                <ActionCard
                  className="action-card"
                  title="Initialize Ticket"
                  desc="Deploy new query"
                  onClick={() => navigate("/user/createTicket")}
                  icon={<FiPlus />}
                />
                <ActionCard
                  className="action-card"
                  title="Access Archives"
                  desc="Historical data"
                  onClick={() => navigate("/user/getTickets")}
                  icon={<FiGrid />}
                />
              </div>
            </div>

            {/* Right Column: Recent Activity Feed */}
            <div className="lg:w-2/3 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-6 feed-title shrink-0">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-text-muted italic font-tech">
                  Live Feed Activity
                </h2>
                <button
                  onClick={() => navigate("/user/getTickets")}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors"
                >
                  View All Log Files →
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-3">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="ticket-item group flex items-center justify-between p-4 bg-surface border border-border rounded-xl hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-primary-glow"
                      onClick={() => navigate("/user/getTickets")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${ticket.status === "resolved" ? "bg-success shadow-[0_0_8px_#22C55E]" : "bg-primary shadow-[0_0_8px_#2563EB]"} animate-pulse`} />
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-widest text-text-main group-hover:text-primary transition-colors line-clamp-1 font-tech">
                            {ticket.subject || ticket.title || "Untitled Query"}
                          </h3>
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter mt-1">
                            {ticket.email || ticket.name} • Ref:{" "}
                            {ticket._id?.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-surface border border-dashed border-border rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
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

const StatCard = ({ icon, label, value, color, className }) => (
  <div
    className={`bg-surface border border-border p-4 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all ${className}`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary opacity-[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10 flex items-center space-x-4">
      <div className="p-3 bg-bg-deep border border-border rounded-xl inline-block shadow-sm shrink-0">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <div className="text-2xl font-black italic tracking-tighter font-tech text-text-main">
          {value}
        </div>
        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-text-muted leading-none">
          {label}
        </div>
      </div>
    </div>
  </div>
);

const ActionCard = ({ title, desc, onClick, icon, className }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 bg-surface border border-border rounded-2xl group hover:border-primary/50 transition-all shadow-sm hover:shadow-primary-glow relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-primary text-white rounded-xl shadow-lg shrink-0">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-text-main group-hover:text-primary transition-colors font-tech">
          {title}
        </h3>
        <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">
          {desc}
        </p>
      </div>
    </div>
  </button>
);

export default Home;
