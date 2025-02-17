import { useState, useEffect } from "react";
import axios from "axios";

// const TicketPage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "low",
//   });


  const [tickets, setTickets] = useState([]); // Ensure tickets is an array

  useEffect(() => {
    axios.get("http://localhost:5000/tickets") // Adjust the URL to your backend
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/tickets", formData);
      setTickets([...tickets, response.data]); // Add new ticket to the list
      setFormData({ title: "", description: "", priority: "low" }); // Reset form
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket System</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        ></textarea>
        {/* <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select> */}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Submit Ticket
        </button>
      </form>
      
      <h2 className="text-xl font-bold mb-2">Existing Tickets</h2>
      {Array.isArray(tickets) && tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id} className="border p-2 mb-2">
              <h3 className="font-bold">{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p className="text-sm">Priority: {ticket.priority}</p>
              <p className="text-sm">Status: {ticket.status || "Open"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default TicketPage;
