// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [editMode, setEditMode] = useState(null);
//   const [editedDescription, setEditedDescription] = useState("");

//   // Fetch Tickets
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/user/getTickets")
//       .then((response) => setTickets(response.data))
//       .catch((error) => console.error("Error fetching tickets:", error));
//   }, []);

//   // Delete Ticket
//   const handleDelete = (ticketId) => {
//     axios
//       .delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
//       .then(() => {
//         setTickets(tickets.filter((ticket) => ticket._id !== ticketId)); // Remove ticket from UI
//       })
//       .catch((error) => console.error("Error deleting ticket:", error));
//   };

//   // Enable Edit Mode
//   const handleEdit = (ticket) => {
//     setEditMode(ticket._id);
//     setEditedDescription(ticket.description);
//   };

//   // Save Edited Description
//   const handleComplete = (ticketId) => {
//     axios
//       .put(`http://localhost:4000/user/updateTicket/${ticketId}`, {
//         description: editedDescription,
//       })
//       .then(() => {
//         setTickets(
//           tickets.map((ticket) =>
//             ticket._id === ticketId
//               ? { ...ticket, description: editedDescription }
//               : ticket
//           )
//         );
//         setEditMode(null); // Exit edit mode
//       })
//       .catch((error) => console.error("Error updating ticket:", error));
//   };

//   // Mark Ticket as Resolved
//   const handleTaskComplete = (ticketId) => {
//     const ticketToComplete = tickets.find((ticket) => ticket._id === ticketId);
//     // Only update the status if it's "open"
//     if (ticketToComplete && ticketToComplete.status === "open") {
//       axios
//         .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, {
//           status: "resolved",
//         })
//         .then(() => {
//           // Update local tickets state after successful status update
//           setTickets(
//             tickets.map((ticket) =>
//               ticket._id === ticketId
//                 ? { ...ticket, status: "resolved" }
//                 : ticket
//             )
//           );
//         })
//         .catch((error) =>
//           console.error("Error updating ticket status:", error)
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
//       <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//         Dashboard
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {tickets.map((ticket) => (
//           <div
//             key={ticket._id}
//             className={`
//             transform transition-all duration-300 hover:scale-105
//             rounded-xl shadow-2xl backdrop-blur-sm
//             ${
//               ticket.status === "resolved"
//                 ? "bg-gradient-to-br from-green-500/90 to-green-600/90"
//                 : "bg-gradient-to-br from-gray-800/90 to-gray-900/90"
//             }
//             p-6 border border-gray-700/50
//           `}
//           >
//             <h3 className="text-2xl font-bold text-center mb-3 tracking-tight">
//               {ticket.subject}
//             </h3>

//             <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
//               <span className="font-medium">{ticket.name}</span>
//               <span>•</span>
//               <span className="text-gray-400">{ticket.email}</span>
//             </div>

//             {editMode === ticket._id ? (
//               <textarea
//                 className="w-full bg-gray-700/50 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none resize-none transition-all duration-200 mb-4"
//                 value={editedDescription}
//                 onChange={(e) => setEditedDescription(e.target.value)}
//                 rows="4"
//               />
//             ) : (
//               <p className="text-center text-gray-200 mb-4 leading-relaxed">
//                 {ticket.description}
//               </p>
//             )}

//             <div className="flex flex-wrap justify-center gap-3 mt-6">
//               {ticket.status === "open" ? (
//                 <button
//                   className="px-6 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
//                   onClick={() => handleTaskComplete(ticket._id)}
//                 >
//                   Task Complete
//                 </button>
//               ) : (
//                 <button
//                   className="px-6 py-2.5 bg-gray-600 cursor-not-allowed rounded-lg font-medium opacity-50"
//                   disabled
//                 >
//                   Task Complete
//                 </button>
//               )}

//               {editMode === ticket._id ? (
//                 <button
//                   onClick={() => handleComplete(ticket._id)}
//                   className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleEdit(ticket)}
//                   className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
//                 >
//                   Edit
//                 </button>
//               )}

//               <button
//                 onClick={() => handleDelete(ticket._id)}
//                 className="px-6 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [completingTickets, setCompletingTickets] = useState(new Set()); // Track animation state

  // Fetch Tickets
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getTickets")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  // Delete Ticket
  const handleDelete = (ticketId) => {
    axios
      .delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      })
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  // Enable Edit Mode
  const handleEdit = (ticket) => {
    setEditMode(ticket._id);
    setEditedDescription(ticket.description);
  };

  // Save Edited Description
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

  // Mark Ticket as Resolved with Animation
  const handleTaskComplete = (ticketId) => {
    const ticketToComplete = tickets.find((ticket) => ticket._id === ticketId);
    
    if (ticketToComplete && ticketToComplete.status === "open") {
      // Start completion animation
      setCompletingTickets(prev => new Set([...prev, ticketId]));
      
      setTimeout(() => {
        axios
          .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, {
            status: "resolved",
          })
          .then(() => {
            setTickets(
              tickets.map((ticket) =>
                ticket._id === ticketId
                  ? { ...ticket, status: "resolved" }
                  : ticket
              )
            );
            // Remove from completing state after animation
            setTimeout(() => {
              setCompletingTickets(prev => {
                const newSet = new Set(prev);
                newSet.delete(ticketId);
                return newSet;
              });
            }, 500);
          })
          .catch((error) => console.error("Error updating ticket status:", error));
      }, 600); // Wait for animation before making API call
    }
  };

  // Mark Ticket as Incomplete
  const handleTaskIncomplete = (ticketId) => {
    axios
      .patch(`http://localhost:4000/user/taskComplete/${ticketId}`, {
        status: "open",
      })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket._id === ticketId
              ? { ...ticket, status: "open" }
              : ticket
          )
        );
      })
      .catch((error) => console.error("Error updating ticket status:", error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tickets.map((ticket) => {
          const isCompleting = completingTickets.has(ticket._id);
          const isResolved = ticket.status === "resolved";
          
          return (
            <div
              key={ticket._id}
              className={`
                transform transition-all duration-500 ease-in-out
                rounded-xl shadow-2xl backdrop-blur-sm
                ${isCompleting ? "scale-105 rotate-1" : ""}
                ${isResolved
                  ? "bg-gradient-to-br from-green-500/90 to-green-600/90"
                  : "bg-gradient-to-br from-gray-800/90 to-gray-900/90"}
                p-6 border border-gray-700/50
                hover:scale-105 hover:shadow-xl
              `}
            >
              <div className={`transition-opacity duration-300 ${isCompleting ? "opacity-0" : "opacity-100"}`}>
                <h3 className="text-2xl font-bold text-center mb-3 tracking-tight">
                  {ticket.subject}
                </h3>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
                  <span className="font-medium">{ticket.name}</span>
                  <span>•</span>
                  <span className="text-gray-400">{ticket.email}</span>
                </div>

                {editMode === ticket._id ? (
                  <textarea
                    className="w-full bg-gray-700/50 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none resize-none transition-all duration-200 mb-4"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows="4"
                  />
                ) : (
                  <p className="text-center text-gray-200 mb-4 leading-relaxed">
                    {ticket.description}
                  </p>
                )}

                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {isResolved ? (
                    <button
                      onClick={() => handleTaskIncomplete(ticket._id)}
                      className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 animate-bounce"
                    >
                      Task Incomplete
                    </button>
                  ) : (
                    <>
                      <button
                        className="px-6 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 "
                        onClick={() => handleTaskComplete(ticket._id)}
                      >
                        Task Complete
                      </button>

                      {editMode === ticket._id ? (
                        <button
                          onClick={() => handleComplete(ticket._id)}
                          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
                      >
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
    </div>
  );
};

export default Dashboard;