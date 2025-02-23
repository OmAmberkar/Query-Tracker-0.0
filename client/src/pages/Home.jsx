


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
  const [selectedDescription, setSelectedDescription] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getTickets")
      .then((response) => {
        const ticketsData = response.data;
        setTickets(ticketsData);
        setStats({
          totalTickets: ticketsData.length,
          pendingTickets: ticketsData.length - ticketsData.filter(ticket => ticket.status === "resolved").length,
          resolvedTickets: ticketsData.filter(ticket => ticket.status === "resolved").length,
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
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    centerMode: false,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden space-y-10">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      <h1 className="text-5xl font-extrabold text-white text-shadow-md text-center">
        Welcome to the Ticketing System
      </h1>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full max-w-4xl">
        <div className="bg-black/50 border border-yellow-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-yellow-500">{stats.totalTickets}</h2>
          <p className="text-lg text-yellow-200">Total Tickets</p>
        </div>
        <div className="bg-black/50 border border-red-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-red-800">{stats.pendingTickets}</h2>
          <p className="text-lg text-red-300">Pending Tickets</p>
        </div>
        <div className="bg-black/50 border border-green-700 rounded-2xl p-8 shadow-lg text-center backdrop-blur-md hover:scale-105 transition-transform w-64">
          <h2 className="text-3xl font-bold text-green-500">{stats.resolvedTickets}</h2>
          <p className="text-lg text-green-300">Resolved Tickets</p>
        </div>
      </div>

      {/* Navigation Button */}
      <button
        type="button"
        onClick={() => navigate("/user/createTicket")}
        className="bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-900 transition z-10 relative">
        Raise a Ticket
      </button>

      {/* Ticket Slider Section */}
      <h6 className="text-2xl font-bold text-center mb-4">
        Manage and track your support tickets easily with a seamless experience
      </h6>
      <div className="w-full max-w-3xl mt-10">
        <div className="relative">
          <Slider {...sliderSettings} ref={sliderRef}>
            {tickets.map((ticket) => {
              const words = ticket.description.split(" ");
              const shortDescription = words.length > 20 ? words.slice(0, 20).join(" ") + "..." : ticket.description;

              return (
                <div
                  key={ticket._id}
                  className="bg-black/50 border border-indigo-500 hover:border-indigo-800 hover:scale-95 p-10 rounded-lg shadow-lg text-center transform  transition duration-300 flex flex-col items-center justify-between w-[400px] h-[200px] mx-auto">
                  <h3 className="text-3xl font-semibold text-blue-400 mb-2">{ticket.subject}</h3>
                  <p className="text-gray-400 text-lg">By: {ticket.name} | {ticket.email}</p>
                  
                  <p className="text-gray-300 text-xl flex-grow overflow-hidden">{shortDescription}</p>

                  {words.length > 20 && (
                    <button 
                      className=" text-blue-400 underline cursor-pointer hover:text-blue-600"
                      onClick={() => setSelectedDescription(ticket.description)}
                    >
                      Read More
                    </button>
                  )}
                </div>
              );
            })}
          </Slider>

          {/* Manual Navigation Buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-10">
  <button
    onClick={() => sliderRef.current.slickPrev()}
    className="bg-gray-700 hover:bg-gray-500 hover:border-indigo-950 text-white font-bold px-5 py-3 rounded-lg shadow-md transition">
    ❮
  </button>
  
  <button
    onClick={() => sliderRef.current.slickNext()}
    className="bg-gray-700 hover:bg-gray-500 text-white font-bold px-5 py-3 rounded-lg shadow-md transition">
    ❯
  </button>
</div>

        </div>
      </div>

      {/* Read More Popup */}
      {selectedDescription && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-11/12 md:w-1/2 h-3/5 overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Full Description</h2>

            {/* Scrollable content */}
            <div className="h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <p>{selectedDescription}</p>
            </div>

            <button onClick={() => setSelectedDescription(null)} className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-800 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

