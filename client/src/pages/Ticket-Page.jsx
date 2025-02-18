// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const TicketPage = () => {
  
//   const [formData, setFormData] = useState({
//     name: "",
//     grpno : "",
//     email: "",
//     subject: "",
//     description: "",
//   });

//   axios.post('http://localhost:4000/user/query',{
//     name: "",
//     grpno : "",
//     email: "",
//     subject: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Submit logic goes here
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative space-y-10 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
//       <h1 className="text-5xl font-extrabold text-white text-shadow-md">Ticket System</h1>
//       <p className="text-lg text-gray-300">Create and manage your support tickets easily.</p>
      
//       {/* Ticket Form */}
//       <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-black/70 border border-gray-700 rounded-2xl p-10 shadow-lg text-center space-y-6 backdrop-blur-md">
//         <input
//           type="text"
//           name="title"
//           placeholder="Ticket Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="bg-transparent border-b border-gray-400 text-white text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Ticket Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="bg-transparent border-b border-gray-400 text-white text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         ></textarea>
        
//         <select
//           name="priority"
//           value={formData.priority}
//           onChange={handleChange}
//           className="bg-transparent border border-gray-500 text-gray-300 text-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105"
//         >
//           Submit Ticket
//         </button>
//       </form>

//       {/* Existing Tickets */}
//       <h2 className="text-3xl font-bold text-white">Existing Tickets</h2>
//       {Array.isArray(tickets) && tickets.length > 0 ? (
//         <ul className="w-full max-w-4xl space-y-6">
//           {tickets.map((ticket) => (
//             <li key={ticket._id} className="bg-black/70 border border-gray-700 rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-all">
//               <h3 className="text-2xl font-bold text-pink-500">{ticket.title}</h3>
//               <p className="text-lg text-gray-300">{ticket.description}</p>
//               <p className="text-sm text-gray-400">Priority: {ticket.priority}</p>
//               <p className="text-sm text-gray-400">Status: {ticket.status || "Open"}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-lg text-gray-300">No tickets found.</p>
//       )}
//     </div>
//   );
// };

// export default TicketPage;





// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const TicketPage = () => {
  
//   const [formData, setFormData] = useState({
//     name: "",
//     grpno : "",
//     email: "",
//     subject: "",
//     description: "",
//   });

//   axios.post('http://localhost:4000/user/register',{
//     name: "",
//     grpno : "",
//     email: "",
//     subject: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Submit logic goes here
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
//       <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full max-w-md z-10">
//         <h2 className="text-3xl font-bold mb-6 text-center">Raise a Ticket</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Group No. </label>
//             <input
//               type="text"
//               name="grpno"
//               value={formData.grpno}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
//             <input
//               type="text"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-32"
//               required
//             ></textarea>
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-medium"
//           >
//             Submit Ticket
//           </button>
//         </form>
        
//         <p className="mt-6 text-sm text-center">
//           <Link to="/user/home" className="text-blue-400 hover:text-blue-300 hover:underline transition">
//             Back to Home
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TicketPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketPage = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    grpno: "",
    email: "",
    subject: "",
    description: "",
  });

  axios.post('http://localhost:4000/user/register', {
    name: "",
    grpno: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic goes here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      
      <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full max-w-xl z-10"> {/* Increased width */}
        <h2 className="text-3xl font-bold mb-6 text-center">Raise a Ticket</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4"> {/* Grid for name and email on same line */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4"> {/* Grid for group no. and subject on same line */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Group No.</label>
              <input
                type="text"
                name="grpno"
                value={formData.grpno}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-32"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-medium"
          >
            Submit Ticket
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center">
          <Link to="/user/home" className="text-blue-400 hover:text-blue-300 hover:underline transition">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TicketPage;
