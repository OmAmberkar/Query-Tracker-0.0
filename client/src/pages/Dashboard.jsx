import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiActivity, FiMessageSquare, FiCheck, FiX, FiUser, FiPlus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const canvasRef = useRef(null);

  // Get current user info
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
      return match ? decodeURIComponent(match.split("=")[1]) : "";
    };
    setCurrentUserEmail(localStorage.getItem("userEmail") || getCookie("email"));
    setCurrentUserRole(localStorage.getItem("userRole") || getCookie("role"));
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "HEX-CYBER-CORE-01";
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

  const fetchTickets = async () => {
    try {
      console.log("Initializing transmission fetch...");
      const res = await axiosInterceptor.get("/user/getTickets", {
        withCredentials: true,
      });
      console.log("Transmission sync successful. Packet count:", Array.isArray(res.data) ? res.data.length : 0);
      setTickets(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Transmission error:", error);
      showToast("Failed to sync transmissions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent deletion protocol. Confirm execution?")) return;
    try {
      await axiosInterceptor.delete(`/user/deleteTicket/${id}`, {
        withCredentials: true,
      });
      showToast("Packet Purged", "success");
      fetchTickets();
    } catch (error) {
      showToast("Purge failed: Access Denied", "error");
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowEditModal(true);
  };

  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInterceptor.put(
        `/user/updateTicket/${editingTicket._id}`,
        {
          description: editingTicket.description,
          solution: editingTicket.solution,
          status: editingTicket.status
        },
        { withCredentials: true }
      );
      if (res.data) {
        showToast("Protocol Updated", "success");
        setShowEditModal(false);
        fetchTickets();
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Update failed", "error");
    }
  };

  const isOwner = (ticket) => {
    if (!ticket.email || !currentUserEmail) return false;
    return ticket.email.toLowerCase() === currentUserEmail.toLowerCase();
  };
  const isAdmin = currentUserRole === "admin";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-primary/10 text-primary border-primary/20';
      case 'in progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'closed': return 'bg-text-muted/10 text-text-muted border-text-muted/20';
      default: return 'bg-text-muted/10 text-text-muted border-text-muted/20';
    }
  };

  const container = useRef();
  const listRef = useRef();

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "SYSLOG-QUERIES-00";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(37, 99, 235, 0.08)";
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

  useGSAP(() => {
    if (loading) return;
    const tl = gsap.timeline();

    tl.from(".dash-header", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
      .from(".ticket-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.6");

  }, { scope: container, dependencies: [loading, tickets] });

  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  return (
    <div ref={container} className="h-screen w-full bg-bg-deep text-text-main relative font-sans selection:bg-primary selection:text-white flex flex-col overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full flex-1">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-6 pt-24 pb-6 w-full flex flex-col min-h-0">
          <header className="dash-header mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
            <div className="space-y-2">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase font-tech text-text-main flex items-center gap-4">
                <FiActivity size={32} className="text-primary animate-pulse" />
                Mission <span className="text-primary drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]">Logs</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-24 bg-gradient-to-r from-primary to-transparent"></div>
                <p className="text-text-muted font-bold uppercase tracking-[0.5em] text-[10px] opacity-80">
                  Sector Access Level: Alpha • Monitoring Operational Query Stream
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/user/createTicket")}
              className="bg-primary text-white px-8 py-4 rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-primary-glow flex items-center justify-center space-x-3 group/btn"
            >
              <span className="group-hover/btn:translate-x-[-2px] transition-transform">Initialize New Query</span>
              <FiPlus className="group-hover/btn:rotate-90 transition-transform" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
              {tickets.length > 0 && tickets.map((ticket, index) => (
                <div
                  key={ticket._id || index}
                  className="ticket-card group bg-white/70 backdrop-blur-xl border border-border/50 p-8 rounded-[40px] hover:border-primary/50 transition-all relative overflow-hidden shadow-xl hover:shadow-primary-glow flex flex-col min-h-[280px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${ticket.status === 'resolved' ? 'bg-success shadow-[0_0_8px_#22C55E]' : 'bg-primary shadow-[0_0_8px_#2563EB]'}`} />
                      <h3 className="text-xs font-black uppercase tracking-widest text-text-main group-hover:text-primary transition-colors line-clamp-1 font-tech">
                        {ticket.subject || ticket.title || "Untitled Query"}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <p className="text-text-muted text-[10px] font-medium leading-relaxed uppercase tracking-wide line-clamp-3">
                      {ticket.description}
                    </p>

                    {ticket.solution && (
                      <div className="bg-success/5 border-l-4 border-l-success border-y border-r border-success/10 p-5 rounded-r-2xl space-y-2">
                        <div className="flex items-center gap-2 text-[8px] font-black text-success uppercase tracking-[0.25em]">
                          <FiCheck className="animate-bounce" /> INITIALIZED RESOLUTION
                        </div>
                        <p className="text-text-main text-[10px] font-bold italic line-clamp-3 leading-relaxed">
                          "{ticket.solution}"
                        </p>
                      </div>
                    )}
                  </div>

                    <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-5">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black text-text-muted/50 uppercase tracking-widest mb-0.5">Reference ID</span>
                        <span className="text-[10px] font-black text-primary font-tech tracking-tighter italic">#{ticket._id?.slice(-8).toUpperCase()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black text-text-muted/50 uppercase tracking-widest mb-0.5">Unit Allocation</span>
                        <span className="text-[10px] font-black text-text-main font-tech tracking-tighter uppercase">{ticket.teamName || "General"}</span>
                      </div>
                      {isOwner(ticket) && (
                        <div className="bg-primary/5 border border-primary/10 px-3 py-1 rounded-lg self-center">
                          <span className="text-[8px] font-black text-primary uppercase tracking-widest">OWNER</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="p-3 rounded-xl bg-bg-deep hover:bg-primary hover:text-white transition-all border border-border/50 shadow-sm"
                      >
                        <FiEdit2 size={14} />
                      </button>

                      {(isOwner(ticket) || isAdmin) && (
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          className="p-3 rounded-xl bg-error/5 text-error hover:bg-error hover:text-white transition-all border border-error/20"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tickets.length === 0 && (
              <div className="text-center py-20 bg-surface border border-dashed border-border rounded-3xl shadow-sm">
                <div className="text-2xl font-black text-text-muted mb-2 opacity-30 uppercase tracking-tighter italic font-tech">No Logs Found</div>
                <p className="text-text-muted font-bold uppercase tracking-widest text-[8px]">Zero operations currently recorded in this sector</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-24 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="fixed inset-0 bg-text-main/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-border/50 p-12 rounded-[50px] shadow-2xl overflow-hidden font-sans backdrop-blur-3xl"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-10 right-10 p-4 bg-bg-deep hover:bg-primary hover:text-white rounded-2xl transition-all border border-border/50 shadow-sm"
              >
                <FiX size={20} />
              </button>

              <div className="mb-10">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-1 font-tech text-text-main">
                  Protocol <span className="text-primary">Update</span>
                </h2>
                <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-[9px] opacity-60">
                  Modifying System Log Packet #{editingTicket?._id?.slice(-8).toUpperCase()}
                </p>
              </div>

              <form onSubmit={updateTicket} className="space-y-8">
                {(isOwner(editingTicket) || isAdmin) && (
                  <>
                    <div className="space-y-2 uppercase tracking-widest">
                      <label className="text-[10px] font-black text-text-muted pl-2">Subject Payload</label>
                      <input
                        type="text"
                        value={editingTicket.subject || editingTicket.title}
                        onChange={(e) => setEditingTicket({ ...editingTicket, subject: e.target.value })}
                        className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-sm focus:border-primary outline-none font-bold placeholder:text-slate-300"
                      />
                    </div>
                    <div className="space-y-2 uppercase tracking-widest">
                      <label className="text-[10px] font-black text-text-muted pl-2">Detailed Data Packet</label>
                      <textarea
                        rows="3"
                        value={editingTicket.description}
                        onChange={(e) => setEditingTicket({ ...editingTicket, description: e.target.value })}
                        className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-sm focus:border-primary outline-none font-bold resize-none placeholder:text-slate-300"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2 uppercase tracking-widest">
                  <label className="text-[10px] font-black text-text-muted pl-2">Support Vector (Solution)</label>
                  <textarea
                    rows="3"
                    placeholder="INJECT TECHNICAL SOLUTION..."
                    value={editingTicket.solution || ""}
                    onChange={(e) => setEditingTicket({ ...editingTicket, solution: e.target.value })}
                    className="w-full bg-bg-deep border border-border rounded-2xl px-6 py-4 text-sm focus:border-primary outline-none font-bold placeholder:text-slate-300"
                  />
                </div>

                {(isOwner(editingTicket) || isAdmin) && (
                  <div className="space-y-2 uppercase tracking-widest">
                    <label className="text-[10px] font-black text-text-muted pl-2">Fulfillment Status</label>
                    <div className="flex gap-4">
                      {['open', 'resolved'].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setEditingTicket({ ...editingTicket, status: s })}
                          className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${editingTicket.status === s ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border hover:bg-bg-deep'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-secondary text-white font-black py-5 rounded-3xl uppercase tracking-widest transition-all shadow-primary-glow"
                  >
                    Authorize Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-10 border border-border hover:bg-bg-deep font-black py-5 rounded-3xl uppercase tracking-widest transition-all text-text-muted hover:text-text-main shadow-sm"
                  >
                    Abort
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
