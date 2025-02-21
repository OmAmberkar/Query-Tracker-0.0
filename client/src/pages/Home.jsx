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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
  });
  const [tickets, setTickets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/user/createTicket");
  };

  useEffect(() => {
    axios.get("http://localhost:4000/user/tickets")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTickets(response.data);
          setStats({
            totalTickets: response.data.length,
            pendingTickets: response.data.filter(ticket => ticket.status === "Pending").length,
            resolvedTickets: response.data.filter(ticket => ticket.status === "Resolved").length,
          });
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: tickets.length > 1 ? 2 : 1, // Show 2 slides if there are many tickets
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-300 transition z-10"
      >
        Raise a Ticket
      </button>

      {/* Ticket Slider Section */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Your Tickets</h2>
        {tickets.length > 0 ? (
          <Slider {...sliderSettings} className="p-4">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center m-2">
                <h3 className="text-xl font-semibold text-blue-400">{ticket.subject}</h3>
                <p className="text-gray-400">By: {ticket.name} | {ticket.email}</p>
                <p className="mt-2">{ticket.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button className="bg-yellow-500 px-4 py-2 rounded">Edit</button>
                  <button className="bg-green-500 px-4 py-2 rounded">Complete</button>
                  <button className="bg-red-500 px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-400">No tickets found.</p>
        )}
      </div>
      
    </div>
  );
};

export default HomePage;
