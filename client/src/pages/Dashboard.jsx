import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "@fontsource/comic-neue";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [completingTickets, setCompletingTickets] = useState(new Set());
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
 const canvasRef = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState(null); // For modal

  
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getTickets")
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      });

      const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    const chars = "HACKTHON@123$%#*@$%&#".split("");
    const fontSize = 12;
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
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    }

    const rainInterval = setInterval(drawRain, 50);
    return () => {
      // clearInterval(timer);
      clearInterval(rainInterval);
    };

  }, []);

  const handleDelete = (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    axios
      .delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
      .then(() => setTickets(tickets.filter((ticket) => ticket._id !== ticketId)))
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  const handleEdit = (ticket) => {
    setEditMode(ticket._id);
    setEditedDescription(ticket.description);
  };

  const handleComplete = (ticketId) => {
    const updatedDescription =
      editedDescription || tickets.find((t) => t._id === ticketId)?.description;
    axios
      .put(`http://localhost:4000/user/updateTicket/${ticketId}`, { description: updatedDescription })
      .then(() => {
        setTickets((prev) =>
          prev.map((t) => (t._id === ticketId ? { ...t, description: updatedDescription } : t))
        );
        setEditMode(null);
      })
      .catch((error) => console.error("Error updating ticket:", error));
  };

  const handleTaskComplete = (ticketId) => {
    setCompletingTickets((prev) => new Set([...prev, ticketId]));
    setTimeout(() => {
      axios
        .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, { status: "resolved" })
        .then(() => {
          setTickets((prev) =>
            prev.map((t) => (t._id === ticketId ? { ...t, status: "resolved" } : t))
          );
          setCompletingTickets((prev) => {
            const newSet = new Set(prev);
            newSet.delete(ticketId);
            return newSet;
          });
        })
        .catch((error) => console.error("Error updating ticket status:", error));
    }, 600);
  };

  const handleTaskIncomplete = (ticketId) => {
    axios
      .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, { status: "open" })
      .then(() => {
        setTickets((prev) =>
          prev.map((t) => (t._id === ticketId ? { ...t, status: "open" } : t))
        );
      })
      .catch((error) => console.error("Error updating ticket status:", error));
  };

  const filteredTickets = tickets.filter((ticket) =>
    filterStatus === "All" ? true : ticket.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOrder === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return (a.subject ?? "").localeCompare(b.subject ?? "");
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>
 

      <div className="relative p-6 md:p-10 max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
           Hackathon Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800/60 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 transition"
          >
            <option>All</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800/60 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 transition"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Alphabetical (A-Z)</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-xl">Loading tickets...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTickets.map((ticket) => {
              const isCompleting = completingTickets.has(ticket._id);
              const isResolved = ticket.status === "resolved";

              return (
                <div
                  key={ticket._id}
                  className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform h-64 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
                    <p className="text-gray-300 line-clamp-3">{ticket.description}</p>

                    {ticket.description.length > 100 && (
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-400 text-sm mt-1 hover:underline"
                      >
                        View More
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {editMode === ticket._id ? (
                      <>
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="text-black px-3 py-1 rounded-md"
                        />
                        <button
                          onClick={() => handleComplete(ticket._id)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            isResolved
                              ? handleTaskIncomplete(ticket._id)
                              : handleTaskComplete(ticket._id)
                          }
                          className={`px-4 py-2 rounded-md transition ${
                            isResolved
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {isCompleting ? "Processing..." : isResolved ? "Reopen" : "Resolve"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for ticket details */}
{selectedTicket && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 rounded-lg max-w-lg w-full relative max-h-[90vh] flex flex-col">
      
      {/* Close button stays fixed inside modal */}
      <button
        onClick={() => setSelectedTicket(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
      >
        ✖
      </button>

      {/* Scrollable content */}
      <div className="overflow-y-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold">{selectedTicket.subject}</h2>
        <p className="text-gray-300 whitespace-pre-line">{selectedTicket.description}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
