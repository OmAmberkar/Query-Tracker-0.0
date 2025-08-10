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
  const [currentTime, setCurrentTime] = useState(new Date());
  const sliderRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    axios.get("http://localhost:4000/user/getTickets")
      .then((res) => {
        const t = res.data;
        setTickets(t);
        setStats({
          totalTickets: t.length,
          pendingTickets: t.length - t.filter(x => x.status === "resolved").length,
          resolvedTickets: t.filter(x => x.status === "resolved").length,
        });
      })
      .catch(console.error);

    // Rain effect
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&#".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawRain() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2757F5";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const rainInterval = setInterval(drawRain, 50);
    return () => {
      clearInterval(timer);
      clearInterval(rainInterval);
    };
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="flex min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Left Content */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
<div className="absolute w-full inset-0  bg-transparent"></div>
      <div className="flex-1 p-8 overflow-y-auto z-10">
        {/* Header */}
        
        
        <div className="text-center mb-12 ">
          <h1 className="text-5xl font-extrabold backdrop-blur-md bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Hackathon Support Hub
          </h1>
          <p className="text-lg text-gray-300 mt-3 backdrop-blur-md">
            Real-time assistance, updates, and mentor connections
          </p>
          <div className="mt-6 px-6 py-3 bg-gray-900 backdrop-blur-xl rounded-xl border border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-cyan-300">{formatTime(currentTime)}</div>
            <div className="text-gray-400">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Queries", value: stats.totalTickets, color: "cyan", sub: "All hackathon requests" },
            { label: "Pending Issues", value: stats.pendingTickets, color: "yellow", sub: "Awaiting mentor response" },
            { label: "Resolved Issues", value: stats.resolvedTickets, color: "green", sub: "Successfully completed" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl bg-gray-900 backdrop-blur-xl border border-gray-700 shadow-lg text-center transition-all hover:scale-105 hover:shadow-[0_0_15px_${card.color}]`}
              style={{ boxShadow: `0 0 15px rgba(var(--${card.color}-rgb,0,255,255),0.4)` }}
            >
              <div className={`text-4xl font-bold text-${card.color}-400`}>{card.value}</div>
              <div className="text-lg">{card.label}</div>
              <div className="text-sm text-gray-400">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/user/createTicket")}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:from-cyan-300 hover:to-blue-400 shadow-lg mr-4 transition-all"
          >
            Raise New Query
          </button>
          <button
            onClick={() => navigate("/user/getTickets")}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-gray-900 hover:from-gray-500 hover:to-gray-600 shadow-lg transition-all"
          >
            View All Tickets
          </button>
        </div>

        {/* Recent Tickets */}
        <div className="mb-12 items-center">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">Recent Support Queries</h2>
          <Slider {...sliderSettings} ref={sliderRef}>
            {tickets.map((ticket) => {
              const words = ticket.description.split(" ");
              const shortDescription =
                words.length > 20 ? words.slice(0, 20).join(" ") + "..." : ticket.description;
              return (
                <div key={ticket._id} className="flex items-center text-center">
                  <div className="p-6 rounded-xl bg-gray-900 w-200 backdrop-blur-xl border border-blue-700 shadow-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-xl font-semibold text-cyan-300">{ticket.subject}</h3>
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          ticket.status === "resolved"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      By: {ticket.name} | {ticket.email}
                    </p>
                    <p className="text-gray-300">{shortDescription}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
