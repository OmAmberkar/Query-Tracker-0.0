import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ticket from "./Ticket-Page";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/tickets") // Adjust API as needed
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Ticketing System</h1>
      <p className="text-gray-700 text-lg mb-4">Manage and track your support tickets easily.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.totalTickets}</h2>
          <p className="text-lg">Total Tickets</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.pendingTickets}</h2>
          <p className="text-lg">Pending Tickets</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.resolvedTickets}</h2>
          <p className="text-lg">Resolved Tickets</p>
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
