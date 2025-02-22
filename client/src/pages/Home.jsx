import { useEffect, useState, useRef } from "react";
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

  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:4000/user/getTickets")
      .then((response) => {
        const ticketsData = response.data;
        setTickets(ticketsData);
        setStats({
          totalTickets: ticketsData.length,
          pendingTickets: ticketsData.filter(ticket => ticket.status === "Pending").length,
          resolvedTickets: ticketsData.filter(ticket => ticket.status === "Resolved").length,
        });
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden space-y-10">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
      <h1 className="text-5xl font-extrabold text-white text-shadow-md text-center">
        Welcome to the Ticketing System
      </h1>
      <p className="text-lg text-gray-300 text-center">
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
        onClick={() => navigate("/user/createTicket")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-300 transition z-10"
      >
        Raise a Ticket
      </button>

      {/* Ticket Slider Section */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Your Tickets</h2>

        <div className="relative">
          <Slider {...sliderSettings} ref={sliderRef}>
            {tickets.map((ticket) => (
              <div 
                key={ticket._id} 
                className="bg-gray-900 border border-gray-700 p-10 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center"
              >
                <h3 className="text-3xl font-semibold text-blue-400 mb-2">{ticket.subject}</h3>
                <p className="text-gray-400 text-lg mb-4">By: {ticket.name} | {ticket.email}</p>
                <p className="text-gray-300 text-xl">{ticket.description}</p>
              </div>
            ))}
          </Slider>

          {/* Manual Navigation Buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="bg-gray-700 hover:bg-gray-500 text-white font-bold px-6 py-3 rounded-lg shadow-md transition"
            >
              ❮ Prev
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="bg-gray-700 hover:bg-gray-500 text-white font-bold px-6 py-3 rounded-lg shadow-md transition"
            >
              Next ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
