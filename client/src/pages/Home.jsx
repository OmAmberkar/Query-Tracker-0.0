import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Ticket from "./Ticket-Page";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();
    navigate('/user/query');
  }
  useEffect(() => {
    axios.get("http://localhost:5000/tickets")
      .then((response) => {
        const tickets = response.data;
        setStats({
          totalTickets: tickets.length,
          pendingTickets: tickets.filter(ticket => ticket.status === "Pending").length,
          resolvedTickets: tickets.filter(ticket => ticket.status === "Resolved").length,
        });
      })
      .catch((error) => console.error("Error fetching ticket stats:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden space-y-10">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
      <h1 className="text-5xl font-extrabold text-white text-shadow-md">Welcome to the Ticketing System</h1>
      <p className="text-lg text-gray-300">Manage and track your support tickets easily with a seamless experience.</p>
      
      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full max-w-4xl">
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-red-400">{stats.totalTickets}</h2>
          <p className="text-lg text-gray-300">Total Tickets</p>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-yellow-400">{stats.pendingTickets}</h2>
          <p className="text-lg text-gray-300">Pending Tickets</p>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-green-400">{stats.resolvedTickets}</h2>
          <p className="text-lg text-gray-300">Resolved Tickets</p>
        </div>
      </div>
      
      {/* Navigation Button */}
      <button
        onClick={() => navigate(<Ticket/>)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Raise a Ticket
      </button>
    </div>
  );
};

export default HomePage;
