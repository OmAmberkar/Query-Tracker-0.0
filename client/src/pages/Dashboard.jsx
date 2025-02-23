
import { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/comic-neue";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [completingTickets, setCompletingTickets] = useState(new Set());
  const [selectedDescription, setSelectedDescription] = useState(null); // For modal

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getTickets")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const handleDelete = (ticketId) => {
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
    axios
      .put(`http://localhost:4000/user/updateTicket/${ticketId}`, {
        description: editedDescription,
      })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket._id === ticketId
              ? { ...ticket, description: editedDescription }
              : ticket
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
        .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, {
          status: "resolved",
        })
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
      .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, {
        status: "open",
      })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket._id === ticketId ? { ...ticket, status: "open" } : ticket
          )
        );
      })
      .catch((error) => console.error("Error updating ticket status:", error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="relative w-full h-full inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 p-4 md:p-8">
        <h1 className="text-5xl font-extrabold text-white text-shadow-md text-center mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tickets.map((ticket) => {
            const isCompleting = completingTickets.has(ticket._id);
            const isResolved = ticket.status === "resolved";
            const words = ticket.description.split(" ");

            const shortDescription =
              ticket.description.length > 20 || words.some((word) => word.length > 20)
                ? ticket.description.slice(0, 20) + "..."
                : words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");

            return (
              <div
                key={ticket._id}
                className={`transition-all duration-300 transform 
                  rounded-xl shadow-2xl backdrop-blur-sm h-[280px] 
                  flex flex-col justify-between 
                  hover:shadow-2xl hover:scale-105
                  ${isCompleting ? "scale-105 rotate-1" : ""}
                  ${isResolved ? "bg-green-700/5 border-2 border-green-400" : "bg-red-700/5 border-2 border-red-700"}`}
              >
                {isResolved && (
                  <div className="absolute top-2 right-2 text-green-600 text-2xl rounded-full bg-green-600">
                    ✔
                  </div>
                )}
                <div className="transition-opacity duration-200 bg-black/50 rounded-2xl p-6 shadow-lg text-center backdrop-blur-md flex flex-col justify-between h-full">
                  <h3 className="text-2xl font-bold text-center mb-3 tracking-tight">
                    {ticket.subject}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
                    <span className="font-extralight">{ticket.name}</span>
                    <span> | </span>
                    <span className="text-gray-600 underline">{ticket.email}</span>
                  </div>

                  {editMode === ticket._id ? (
                    <textarea
                      className="w-full bg-gray-700/50 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none resize-none transition-all duration-200 h-24"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    <p className="text-center text-gray-200 mb-4 leading-relaxed break-words flex-grow font-['Comic_Neue']">
                      {shortDescription}
                      {ticket.description.length > 20 && (
                        <span
                          className="text-blue-400 cursor-pointer ml-2"
                          onClick={() => setSelectedDescription(ticket.description)}
                        >
                          [Read More...]
                        </span>
                      )}
                    </p>
                  )}

                  <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 mt-4">
                    {isResolved ? (
                      <button onClick={() => handleTaskIncomplete(ticket._id)} className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded-lg">
                        Deny Ticket
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleTaskComplete(ticket._id)} className="px-6 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg">
                          Approve Ticket
                        </button>

                        {editMode === ticket._id ? (
                          <button onClick={() => handleComplete(ticket._id)} className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg">
                            Save
                          </button>
                        ) : (
                          <button onClick={() => handleEdit(ticket)} className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded-lg">
                            Edit
                          </button>
                        )}

                        <button onClick={() => handleDelete(ticket._id)} className="px-6 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Full Description */}
{selectedDescription && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-11/12 md:w-1/2 h-3/5 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Full Description</h2>
      
      {/* Scrollable content */}
      <div className="h-[300px]  overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <p>{selectedDescription}</p>
      </div>

      <button onClick={() => setSelectedDescription(null)} className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-800 rounded-lg">
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Dashboard;
