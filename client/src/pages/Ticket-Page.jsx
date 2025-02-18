import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketPage = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    grpno : "",
    email: "",
    subject: "",
    description: "",
  });

  axios.post('http://localhost:4000/user/register',{
    name: "",
    grpno : "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic goes here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative space-y-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
      <h1 className="text-5xl font-extrabold text-white text-shadow-md">Ticket System</h1>
      <p className="text-lg text-gray-300">Create and manage your support tickets easily.</p>
      
      {/* Ticket Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-black/70 border border-gray-700 rounded-2xl p-10 shadow-lg text-center space-y-6 backdrop-blur-md">
        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={formData.title}
          onChange={handleChange}
          className="bg-transparent border-b border-gray-400 text-white text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Ticket Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-transparent border-b border-gray-400 text-white text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="bg-transparent border border-gray-500 text-gray-300 text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          Submit Ticket
        </button>
      </form>

      {/* Existing Tickets */}
      <h2 className="text-3xl font-bold text-white">Existing Tickets</h2>
      {Array.isArray(tickets) && tickets.length > 0 ? (
        <ul className="w-full max-w-4xl space-y-6">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="bg-black/70 border border-gray-700 rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-pink-500">{ticket.title}</h3>
              <p className="text-lg text-gray-300">{ticket.description}</p>
              <p className="text-sm text-gray-400">Priority: {ticket.priority}</p>
              <p className="text-sm text-gray-400">Status: {ticket.status || "Open"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-300">No tickets found.</p>
      )}
    </div>
  );
};

export default TicketPage;