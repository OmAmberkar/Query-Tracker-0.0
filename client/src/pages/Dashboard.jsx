// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     axios.get("http://localhost:4000/user/tickets")
//       .then(response => setTickets(response.data))
//       .catch(error => console.error("Error fetching tickets:", error));
//   }, []);

//   const filteredTickets = tickets.filter(ticket => {
//     if (filter === "All") return true;
//     return ticket.status === filter;
//   });

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-10">
//       <h1 className="text-4xl font-bold text-center mb-6">Ticket Dashboard</h1>
      
//       <div className="flex justify-center mb-4">
//         <select 
//           value={filter} 
//           onChange={(e) => setFilter(e.target.value)}
//           className="bg-gray-800 text-white px-4 py-2 rounded-md"
//         >
//           <option value="All">All Tickets</option>
//           <option value="Pending">Pending</option>
//           <option value="Resolved">Resolved</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="p-2">ID</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Subject</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTickets.map((ticket, index) => (
//               <tr key={index} className="border-t border-gray-700 text-center">
//                 <td className="p-2">{ticket.id}</td>
//                 <td className="p-2">{ticket.name}</td>
//                 <td className="p-2">{ticket.email}</td>
//                 <td className="p-2">{ticket.subject}</td>
//                 <td className={`p-2 font-bold ${ticket.status === "Pending" ? "text-yellow-400" : "text-green-400"}`}>{ticket.status}</td>
//                 <td className="p-2">{new Date(ticket.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;








import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/user/tickets")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{ticket.subject}</h3>
            <p className="text-gray-400">By: {ticket.name} | {ticket.email}</p>
            <p className="mt-2">{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
