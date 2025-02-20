import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TicketPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    grpno: "",
    email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      await axios.post("http://localhost:4000/user/createTicket", formData);

      // Simulate API call delay
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true); // Show success tick
      }, 2000);

      // Redirect after tick appears
      setTimeout(() => {
        navigate("/user/getTickets");
      }, 4000);

    } catch (error) {
      console.error("Error submitting ticket:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>

      <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full max-w-xl z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Raise a Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Group No.</label>
              <input type="text" name="grpno" value={formData.grpno} onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="w-full px-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-32" required></textarea>
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-medium">
            Submit Ticket
          </button>
        </form>

        {/* ✅ Show Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              {/* Spinning Loader */}
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-green-700 font-bold">Submitting Ticket...</p>
            </div>
          </div>
        )}

        {/* ✅ Show Green Tick after Submission */}
        {submitted && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              {/* Green Tick Icon */}
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="mt-4 text-green-700 font-bold">Ticket Submitted Successfully!</p>
            </div>
          </div>
        )}

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