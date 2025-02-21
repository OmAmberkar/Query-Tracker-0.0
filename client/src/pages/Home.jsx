// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import Ticket from "./Ticket-Page";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalTickets: 0,
//     pendingTickets: 0,
//     resolvedTickets: 0,
//   });

//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     navigate('/user/createTicket');
//   }
//   useEffect(() => {
//     axios.get("http://localhost:4000/user/tickets")
//       .then((response) => {
//         const tickets = response.data;
//         setStats({
//           totalTickets: tickets.length,
//           pendingTickets: tickets.filter(ticket => ticket.status === "Pending").length,
//           resolvedTickets: tickets.filter(ticket => ticket.status === "Resolved").length,
//         });
//       })
//       .catch((error) => console.error("Error fetching ticket stats:", error));
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden space-y-10">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>

//       <h1 className="text-5xl font-extrabold text-white text-shadow-md">Welcome to the Ticketing System</h1>
//       <p className="text-lg text-gray-300">Manage and track your support tickets easily with a seamless experience.</p>

//       {/* Stats Section */}
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full max-w-4xl">
//         <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
//           <h2 className="text-3xl font-bold text-red-400">{stats.totalTickets}</h2>
//           <p className="text-lg text-gray-300">Total Tickets</p>
//         </div>
//         <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
//           <h2 className="text-3xl font-bold text-yellow-400">{stats.pendingTickets}</h2>
//           <p className="text-lg text-gray-300">Pending Tickets</p>
//         </div>
//         <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
//           <h2 className="text-3xl font-bold text-green-400">{stats.resolvedTickets}</h2>
//           <p className="text-lg text-gray-300">Resolved Tickets</p>
//         </div>
//       </div>

//       {/* Navigation Button */}
//       <button
//         type="button"
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-300 transition z-10"
//       >
//         Raise a Ticket
//       </button>

//     </div>
//   );
// };

// export default HomePage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
  });
  const [tickets, setTickets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/user/createTicket");
  };

  useEffect(() => {
    // Fetch ticket stats
    axios
      .get("http://localhost:4000/user/tickets")
      .then((response) => {
        const tickets = response.data;
        setStats({
          totalTickets: tickets.length,
          pendingTickets: tickets.filter(
            (ticket) => ticket.status === "Pending"
          ).length,
          resolvedTickets: tickets.filter(
            (ticket) => ticket.status === "Resolved"
          ).length,
        });
      })
      .catch((error) => console.error("Error fetching ticket stats:", error));

    // Fetch all tickets for list display
    axios
      .get("http://localhost:4000/user/getTickets")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    // Set interval for auto slide effect
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tickets.length); // loop through the tickets
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [tickets.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden space-y-10">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>

      <h1 className="text-5xl font-extrabold text-white text-shadow-md">
        Welcome to the Ticketing System
      </h1>
      <p className="text-lg text-gray-300">
        Manage and track your support tickets easily with a seamless experience.
      </p>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full max-w-4xl">
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-red-400">
            {stats.totalTickets}
          </h2>
          <p className="text-lg text-gray-300">Total Tickets</p>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-yellow-400">
            {stats.pendingTickets}
          </h2>
          <p className="text-lg text-gray-300">Pending Tickets</p>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-green-400">
            {stats.resolvedTickets}
          </h2>
          <p className="text-lg text-gray-300">Resolved Tickets</p>
        </div>
      </div>

      {/* Navigation Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-300 transition z-10"
      >
        Raise a Ticket
      </button>

      {/* Carousel Tickets Section */}
      {/* <div className="mt-12 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Your Tickets</h2>
        <div className="relative w-full h-80 overflow-hidden rounded-lg">
          {tickets.length > 0 && (
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {tickets.map((ticket, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6 py-3 bg-gray-800 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">{ticket.subject}</h3>
                  <p className="text-gray-400">By: {ticket.name} | {ticket.email}</p>
                  <p className="mt-2">{ticket.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="mt-12 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Your Tickets
        </h2>
        <div className="relative w-full h-80 overflow-hidden rounded-lg">
          {tickets.length > 0 && (
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`, // Adjust for smaller ticket width
              }}
            >
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="w-1/2 flex-shrink-0 px-4 py-3 bg-gray-800 rounded-lg shadow-lg mx-2"
                >
                  <h3 className="text-xl font-semibold">{ticket.subject}</h3>
                  <p className="text-gray-400">
                    By: {ticket.name} | {ticket.email}
                  </p>
                  <p className="mt-2">{ticket.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
