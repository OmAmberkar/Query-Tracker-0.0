import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser, FiShield, FiHome, FiGrid, FiPlus } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState({ email: "", role: "" });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Simple way to get user info from cookies/localStorage
        const getCookie = (name) => {
            const match = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
            return match ? decodeURIComponent(match.split("=")[1]) : "";
        };

        setUser({
            email: localStorage.getItem("userEmail") || getCookie("email"),
            role: localStorage.getItem("userRole") || getCookie("role")
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        navigate("/");
    };

    const navLinks = [
        { name: "Home", path: "/user/home", icon: <FiHome /> },
        { name: "Dashboard", path: "/user/getTickets", icon: <FiGrid /> },
        { name: "New Ticket", path: "/user/createTicket", icon: <FiPlus /> },
    ];

    if (user.role === "admin") {
        navLinks.push({ name: "Admin Panel", path: "/admin/panel", icon: <FiShield /> });
    }

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-5 bg-black/80 backdrop-blur-2xl border-b border-white/5" : "py-6 bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={user.email ? "/user/home" : "/"} className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-lemon rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(227,255,0,0.2)] group-hover:scale-110 transition-transform duration-500">
                            <span className="text-black font-black text-xl tracking-tighter">QT</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white group-hover:text-lemon transition-colors">
                            QUERY<span className="text-lemon group-hover:text-white transition-colors">TRACKER</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${location.pathname === link.path ? "bg-lemon text-black shadow-lg shadow-lemon/20" : "text-gray-400 hover:text-lemon hover:bg-white/5"}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-white/10 mx-6" />

                        {user.email ? (
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-3 bg-white/[0.03] border border-white/5 pl-2 pr-5 py-1.5 rounded-full">
                                    <div className="w-8 h-8 rounded-full bg-lemon/10 flex items-center justify-center text-lemon">
                                        <FiUser size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-white/50 leading-none">OPERATOR</span>
                                        <span className="text-[10px] font-black text-lemon leading-none mt-0.5">{user.email.split('@')[0].toUpperCase()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-3 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-full transition-all"
                                >
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/user/login" className="bg-lemon text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-lemon/10">
                                Authorize
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-3 bg-white/5 rounded-2xl text-lemon"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-12 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-4 text-2xl font-black italic uppercase tracking-tighter text-white hover:text-lemon transition-colors"
                                >
                                    <span className="text-lemon">{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-white/10">
                                {user.email ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-4 text-2xl font-black italic uppercase tracking-tighter text-red-500"
                                    >
                                        <FiLogOut />
                                        <span>Terminate Session</span>
                                    </button>
                                ) : (
                                    <Link
                                        to="/user/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full bg-lemon text-black text-center py-5 rounded-3xl font-black text-xl italic uppercase tracking-tighter"
                                    >
                                        Authorize
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
