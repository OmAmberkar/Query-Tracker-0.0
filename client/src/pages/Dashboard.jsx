// export default Dashboard;
import { useEffect, useState } from "react";
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
  }, []);

  const handleDelete = (ticketId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      })
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  const handleEdit = (ticket) => {
    setEditMode(ticket._id);
    setEditedDescription(ticket.description);
  };

  const handleComplete = (ticketId) => {
    const updatedDescription =
      editedDescription || tickets.find((ticket) => ticket._id === ticketId)?.description;

    axios
      .put(`http://localhost:4000/user/updateTicket/${ticketId}`, { description: updatedDescription })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket._id === ticketId ? { ...ticket, description: updatedDescription } : ticket
          )
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
          setTickets(
            tickets.map((ticket) =>
              ticket._id === ticketId ? { ...ticket, status: "resolved" } : ticket
            )
          );

          setTimeout(() => {
            setCompletingTickets((prev) => {
              const newSet = new Set(prev);
              newSet.delete(ticketId);
              return newSet;
            });
          }, 500);
        })
        .catch((error) => console.error("Error updating ticket status:", error));
    }, 600);
  };

  const handleTaskIncomplete = (ticketId) => {
    axios
      .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, { status: "open" })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket._id === ticketId ? { ...ticket, status: "open" } : ticket
          )
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="relative w-full h-full inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 p-4 md:p-8">
        <h1 className="text-5xl font-extrabold text-white text-shadow-md text-center mb-10">
          Dashboard
        </h1>

        <div className="flex justify-between max-w-7xl mx-auto mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            <option>All</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Alphabetical (A-Z)</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-xl text-white">Loading tickets...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedTickets.map((ticket) => {
              const isCompleting = completingTickets.has(ticket._id);
              const isResolved = ticket.status === "resolved";
              return (
                <div key={ticket._id} className="transition-all duration-300 transform bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold">{ticket.subject}</h2>
                  <p className="text-gray-300">{ticket.description}</p>
                  <div className="mt-4 flex gap-2">
                    {editMode === ticket._id ? (
                      <>
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="text-black px-2 py-1 rounded-md"
                        />
                        <button
                          onClick={() => handleComplete(ticket._id)}
                          className="bg-green-600 px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="bg-blue-600 px-4 py-2 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          className="bg-red-600 px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            isResolved ? handleTaskIncomplete(ticket._id) : handleTaskComplete(ticket._id)
                          }
                          className={`px-4 py-2 rounded-md ${isResolved ? "bg-yellow-500" : "bg-green-500"}`}
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
    </div>
  );
};

export default Dashboard;
