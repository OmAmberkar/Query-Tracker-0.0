import { useEffect, useState, useRef } from "react";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiActivity, FiMessageSquare, FiCheck, FiX, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const fetchTickets = async () => {
    try {
      const res = await axiosInterceptor.get("/user/getTickets", {
        withCredentials: true,
      });
      setTickets(res.data || []);
    } catch (error) {
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

  const isOwner = (ticket) => ticket.email === currentUserEmail;
  const isAdmin = currentUserRole === "admin";

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-lemon selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10 pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
                Mission <span className="text-lemon">Logs</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                System Archives • Global Network Activity
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/[0.02] border border-white/5 p-8 rounded-[32px] hover:border-lemon/30 transition-all relative overflow-hidden backdrop-blur-xl flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-lemon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${ticket.status === 'resolved' ? 'bg-lemon shadow-[0_0_10px_#e3ff00]' : 'bg-gray-700'}`} />
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-lemon transition-colors line-clamp-1">
                        {ticket.subject || ticket.title || "Untitled Query"}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'resolved'
                      ? "bg-lemon/10 text-lemon border border-lemon/20"
                      : "bg-white/5 text-gray-400 border border-white/10"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-wide">
                    {ticket.description}
                  </p>

                  {ticket.solution && (
                    <div className="bg-lemon/5 border border-lemon/10 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-[8px] font-black text-lemon uppercase tracking-[0.2em]">
                        <FiCheck /> INITIALIZED SOLUTION
                      </div>
                      <p className="text-white text-[11px] font-bold italic">"{ticket.solution}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-4">
                    <InfoTag label="REF" value={ticket._id?.slice(-8).toUpperCase()} />
                    {isOwner(ticket) && (
                      <div className="flex items-center gap-1.5 bg-lemon/10 px-3 py-1 rounded-full">
                        <FiUser size={8} className="text-lemon" />
                        <span className="text-[8px] font-black text-lemon uppercase">Self</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      title={isOwner(ticket) || isAdmin ? "Update Protocol" : "Add Solution"}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-lemon hover:text-black transition-all flex items-center gap-2"
                    >
                      {isOwner(ticket) || isAdmin ? <FiEdit2 size={12} /> : <FiMessageSquare size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {isOwner(ticket) || isAdmin ? "Edit" : "Solve"}
                      </span>
                    </button>

                    {(isOwner(ticket) || isAdmin) && (
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500 transition-all"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {tickets.length === 0 && (
            <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[40px]">
              <div className="text-4xl font-black text-gray-800 mb-4 opacity-50 uppercase tracking-tighter italic">No Logs Found</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Zero operations currently recorded in this sector</p>
            </div>
          )}
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
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-black border border-white/10 p-12 rounded-[50px] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-lemon" />
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
              >
                <FiX className="text-gray-500 hover:text-white" />
              </button>

              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-10">
                Update <span className="text-lemon">Log Protocol</span>
              </h2>

              <form onSubmit={updateTicket} className="space-y-8">
                {(isOwner(editingTicket) || isAdmin) && (
                  <>
                    <div className="space-y-2 uppercase tracking-widest">
                      <label className="text-[10px] font-black text-gray-500 pl-2">Subject Payload</label>
                      <input
                        type="text"
                        value={editingTicket.subject || editingTicket.title}
                        onChange={(e) => setEditingTicket({ ...editingTicket, subject: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-lemon outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2 uppercase tracking-widest">
                      <label className="text-[10px] font-black text-gray-500 pl-2">Detailed Data Packet</label>
                      <textarea
                        rows="3"
                        value={editingTicket.description}
                        onChange={(e) => setEditingTicket({ ...editingTicket, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-lemon outline-none font-bold resize-none"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2 uppercase tracking-widest">
                  <label className="text-[10px] font-black text-gray-500 pl-2">Support Vector (Solution)</label>
                  <textarea
                    rows="3"
                    placeholder="INJECT TECHNICAL SOLUTION..."
                    value={editingTicket.solution || ""}
                    onChange={(e) => setEditingTicket({ ...editingTicket, solution: e.target.value })}
                    className="w-full bg-lemon/5 border border-lemon/20 rounded-2xl px-6 py-4 text-sm focus:border-lemon outline-none font-bold placeholder:text-gray-700"
                  />
                </div>

                {(isOwner(editingTicket) || isAdmin) && (
                  <div className="space-y-2 uppercase tracking-widest">
                    <label className="text-[10px] font-black text-gray-500 pl-2">Fulfillment Status</label>
                    <div className="flex gap-4">
                      {['open', 'resolved'].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setEditingTicket({ ...editingTicket, status: s })}
                          className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${editingTicket.status === s ? 'bg-lemon text-black' : 'bg-white/5 text-gray-500 border border-white/10'}`}
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
                    className="flex-1 bg-lemon hover:bg-white text-black font-black py-5 rounded-3xl uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(227,255,0,0.2)]"
                  >
                    Authorize Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-10 border border-white/10 hover:bg-white/5 font-black py-5 rounded-3xl uppercase tracking-widest transition-all text-gray-500 hover:text-white"
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

const InfoTag = ({ label, value }) => (
  <div className="flex items-center space-x-2">
    <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600">{label}:</span>
    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{value}</span>
  </div>
);

export default Dashboard;
