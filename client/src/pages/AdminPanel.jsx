import { useEffect, useState, useRef } from "react";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { showToast } from "../components/notification.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiTrash2, FiShield, FiActivity, FiSearch, FiGlobe, FiInbox } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("users"); // "users" or "tickets"
    const [searchTerm, setSearchTerm] = useState("");
    const canvasRef = useRef(null);

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const letters = "ADMIN-CORE-SYSTEM-99";
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

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, ticketsRes] = await Promise.all([
                axiosInterceptor.get("/admin/users", { withCredentials: true }),
                axiosInterceptor.get("/user/getTickets", { withCredentials: true }),
            ]);

            if (usersRes.data.success) {
                setUsers(usersRes.data.users);
            }
            setTickets(ticketsRes.data || []);
            showToast("System Link Established", "success");
        } catch (error) {
            console.error("Fetch error:", error);
            showToast("Security Breach: Access Restricted", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm("EXECUTE PERMANENT USER PURGE?")) return;
        try {
            const res = await axiosInterceptor.delete(`/admin/users/${id}`, { withCredentials: true });
            if (res.data.success) {
                showToast("User Record Purged", "success");
                setUsers(users.filter(u => u._id !== id));
            }
        } catch (error) {
            showToast("Purge Protocol Failed", "error");
        }
    };

    const toggleRole = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        try {
            const res = await axiosInterceptor.put(`/admin/users/${user._id}/role`, { role: newRole }, { withCredentials: true });
            if (res.data.success) {
                showToast(`Role escalated to ${newRole.toUpperCase()}`, "success");
                setUsers(users.map(u => u._id === user._id ? { ...u, role: newRole } : u));
            }
        } catch (error) {
            showToast("Elevation Failed", "error");
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTickets = tickets.filter(t =>
        (t.title || t.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-black text-white relative font-sans selection:bg-lemon selection:text-black">
            {/* Background canvas should be at the very bottom */}
            <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-10 pointer-events-none" />

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
                <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-lemon rounded-2xl shadow-[0_0_20px_rgba(227,255,0,0.3)]">
                                <FiShield className="text-black text-2xl" />
                            </div>
                            <h1 className="text-5xl font-black italic tracking-tighter uppercase">
                                Central <span className="text-lemon">Command</span>
                            </h1>
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] pl-1">
                            System Administrator Console • Priority Level 0
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/[0.03] p-1.5 rounded-[24px] border border-white/5 backdrop-blur-3xl">
                        <TabButton
                            active={activeTab === "users"}
                            onClick={() => setActiveTab("users")}
                            icon={<FiUsers />}
                            label="Operator Database"
                        />
                        <TabButton
                            active={activeTab === "tickets"}
                            onClick={() => setActiveTab("tickets")}
                            icon={<FiInbox />}
                            label="Mission Logs"
                        />
                    </div>
                </header>

                <div className="mb-8 relative max-w-xl">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-lemon text-xl" />
                    <input
                        type="text"
                        placeholder="NETWORK SEARCH..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm font-black uppercase tracking-widest focus:outline-none focus:border-lemon transition-all"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "users" ? (
                        <motion.div
                            key="users"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredUsers.map((user, idx) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-white/[0.02] border border-white/5 p-8 rounded-[40px] hover:border-lemon/30 transition-all relative overflow-hidden backdrop-blur-xl"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-lemon opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-lemon italic">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => toggleRole(user)}
                                                title="Toggle Admin Privilege"
                                                className={`p-3 rounded-xl transition-all ${user.role === 'admin' ? 'bg-lemon text-black shadow-[0_0_15px_rgba(227,255,0,0.3)]' : 'bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white'}`}
                                            >
                                                <FiShield size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                title="Purge User"
                                                className="p-3 z-1 rounded-xl bg-white/5 hover:bg-red-500 transition-all text-gray-500 hover:text-white"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-8">
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-lemon transition-colors">
                                            {user.name}
                                        </h3>
                                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest truncate">{user.email}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${user.role === 'admin' ? 'text-lemon' : 'text-gray-600'}`}>
                                            ROLE: {user.role?.toUpperCase()}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">
                                            ID: {user._id?.slice(-8).toUpperCase()}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="tickets"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            {filteredTickets.map((ticket, idx) => (
                                <motion.div
                                    key={ticket._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-[40px] hover:bg-white/[0.04] transition-all"
                                >
                                    <div className="flex items-center space-x-8 mb-6 md:mb-0">
                                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${ticket.status === 'resolved' ? 'text-lemon bg-lemon' : 'text-gray-700 bg-gray-700'}`} />
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white group-hover:text-lemon transition-colors">
                                                {ticket.title || ticket.subject || "Untitled Query"}
                                            </h3>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                                    BY: {ticket.name || ticket.email}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                                    REF: {ticket._id?.slice(-8).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'resolved' ? 'bg-lemon/10 text-lemon border border-lemon/20' : 'bg-white/5 text-gray-600 border border-white/10'}`}>
                                            {ticket.status?.toUpperCase()}
                                        </span>
                                        <button
                                            onClick={() => window.location.href = "/user/getTickets"}
                                            className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                                        >
                                            Inspect Protocol →
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {(activeTab === "users" ? filteredUsers : filteredTickets).length === 0 && (
                    <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[60px]">
                        <FiActivity className="mx-auto text-4xl text-gray-800 mb-6" />
                        <div className="text-2xl font-black text-gray-700 uppercase tracking-tight italic">Zero entities detected in this sector</div>
                        <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">The search query returned no matching data packets</p>
                    </div>
                )}
            </main>
        </div>
    );
}

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-3 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-lemon text-black shadow-2xl shadow-lemon/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
        {React.cloneElement(icon, { size: 14 })}
        <span>{label}</span>
    </button>
);

export default AdminPanel;
