// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [editMode, setEditMode] = useState(null); // Stores the ticket ID being edited
//   const [editedDescription, setEditedDescription] = useState(""); // Stores the updated description

//   // Fetch Tickets
//   useEffect(() => {
//     axios.get("http://localhost:4000/user/getTickets")
//       .then((response) => setTickets(response.data))
//       .catch((error) => console.error("Error fetching tickets:", error));
//   }, []);

//   // Delete Ticket
//   const handleDelete = (ticketId) => {
//     axios.delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
//       .then(() => {
//         setTickets(tickets.filter(ticket => ticket._id !== ticketId)); // Remove ticket from UI
//       })
//       .catch(error => console.error("Error deleting ticket:", error));
//   };

//   // Enable Edit Mode
//   const handleEdit = (ticket) => {
//     setEditMode(ticket._id); // Set the ticket in edit mode
//     setEditedDescription(ticket.description); // Set current description in input
//   };

//   // Save Edited Description
//   const handleComplete = (ticketId) => {
//     axios.put(`http://localhost:4000/user/updateTicket/${ticketId}`, { description: editedDescription })
//       .then(() => {
//         setTickets(tickets.map(ticket => 
//           ticket._id === ticketId ? { ...ticket, description: editedDescription } : ticket
//         ));
//         setEditMode(null); // Exit edit mode
//       })
//       .catch(error => console.error("Error updating ticket:", error));
//   };

//   const handleTaskComplete = (ticketID) =>{
//     const ticketToComplete  = tickets.find(ticket => ticket._id === ticket);
    
//     if (ticketToComplete && ticketToComplete.status === "open") {
//       axios.post(`http://localhost:4000/user/updateTicket/${ticketID}`, { status: "resolved" })
//       .then(() => {
//         setTickets(tickets.map(ticket =>
//           ticket._id === ticketID ? { ...ticket, status: "resolved" } : ticket
//           )
//         );
//       })
//       .catch(error => console.error("Error updating ticket",error));
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tickets.map((ticket) => (
//           <div key={ticket._id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-center">{ticket.subject}</h3>
//             <p className="text-gray-400 text-center">By: {ticket.name} | {ticket.email}</p>

//             {/* Edit Mode: Show input field when editing */}
//             {editMode === ticket._id ? (
//               <textarea
//                 className="mt-2 w-full bg-gray-700 text-white p-2 rounded"
//                 value={editedDescription}
//                 onChange={(e) => setEditedDescription(e.target.value)}
//               />
//             ) : (
//               <p className="mt-2 text-center">{ticket.description}</p>
//             )}

//             {/* Buttons Section */}
//             <div className="mt-4 flex gap-3">
//               {ticket.status === "open" ? (
//                 <button
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//                   onClick={() => handleTaskComplete(ticket._id)}
//                 >
//                   Task Complete
//                 </button>
//               ) : (
//                 <button className="bg-green-100 hover:bg-green-600 text-white px-4 py-2 rounded-lg" disabled>
//                   Task Complete
//                 </button>
//               )}

//               {editMode === ticket._id ? (
//                 <button
//                   onClick={() => handleComplete(ticket._id)}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleEdit(ticket)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Edit
//                 </button>
//               )}
              
//               <button
//                 onClick={() => handleDelete(ticket._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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

  // Fetch Tickets
  useEffect(() => {
    axios.get("http://localhost:4000/user/getTickets")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  // Delete Ticket
  const handleDelete = (ticketId) => {
    axios.delete(`http://localhost:4000/user/deleteTicket/${ticketId}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket._id !== ticketId)); // Remove ticket from UI
      })
      .catch(error => console.error("Error deleting ticket:", error));
  };

  // Enable Edit Mode
  const handleEdit = (ticket) => {
    setEditMode(ticket._id);
    setEditedDescription(ticket.description);
  };

  // Save Edited Description
  const handleComplete = (ticketId) => {
    axios.put(`http://localhost:4000/user/updateTicket/${ticketId}`, { description: editedDescription })
      .then(() => {
        setTickets(tickets.map(ticket => 
          ticket._id === ticketId ? { ...ticket, description: editedDescription } : ticket
        ));
        setEditMode(null); // Exit edit mode
      })
      .catch(error => console.error("Error updating ticket:", error));
  };

  // Mark Ticket as Resolved
  const handleTaskComplete = (ticketId) => {
    const ticketToComplete = tickets.find(ticket => ticket._id === ticketId);
    console.log(ticketId)
    // Only update the status if it's "open"
    if (ticketToComplete && ticketToComplete.status === "open") { 
      axios.patch(`http://localhost:4000/user/updateTicket/${ticketId}`, { status: "resolved" })
        .then(() => {
          // Update local tickets state after successful status update
          setTickets(tickets.map(ticket =>
            ticket._id === ticketId ? { ...ticket, status: "resolved" } : ticket
          ));
        })
        .catch(error => console.error("Error updating ticket status:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${ticket.status === "resolved" ? "bg-green-500" : "bg-gray-800"}`}
          >
            <h3 className="text-xl font-semibold text-center">{ticket.subject}</h3>
            <p className="text-gray-400 text-center">By: {ticket.name} | {ticket.email}</p>

            {/* Edit Mode: Show input field when editing */}
            {editMode === ticket._id ? (
              <textarea
                className="mt-2 w-full bg-gray-700 text-white p-2 rounded"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <p className="mt-2 text-center">{ticket.description}</p>
            )}

            {/* Buttons Section */}
            <div className="mt-4 flex gap-3">
              {ticket.status === "open" ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleTaskComplete(ticket._id)}
                >
                  Task Complete
                </button>
              ) : (
                <button className="bg-green-100 hover:bg-green-600 text-white px-4 py-2 rounded-lg" disabled>
                  Task Complete
                </button>
              )}

              {editMode === ticket._id ? (
                <button
                  onClick={() => handleComplete(ticket._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(ticket)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(ticket._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
