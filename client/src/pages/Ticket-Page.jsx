import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInterceptor from "../utils/axiosInterceptor.js";
import { toast } from "react-toastify";

const TicketPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    grpno: "",
    email: "",
    subject: "",
    description: "",
  });

  // fill email from localStorage (set on login) or from cookie as fallback
  const getCookie = (name) => {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(name + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : "";
  };

  useEffect(() => {
    const stored = localStorage.getItem("userEmail") || getCookie("email");
    if (stored) setFormData((p) => ({ ...p, email: stored }));
  }, []);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // server will use authenticated email, drop any client value
      const { email, ...payload } = formData;
      await axiosInterceptor.post("/user/createTicket", payload);
      toast.success("Ticket created");
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1000);

      setTimeout(() => {
        navigate("/user/home");
      }, 4000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("Failed to submit ticket. Please try again.");
      setError("Failed to submit ticket. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>

      <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full max-w-xl z-10 relative">
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
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                required
              />
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
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-32" required></textarea>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-medium cursor-pointer">
            Submit Ticket
          </button>
        </form>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 ">
            <div className="bg-transparent p-6 rounded-lg shadow-lg flex flex-col items-center animate-bounce">
              <div className="w-16 h-16 border-4 border-red-600 border-t-green-800 rounded-full animate-spin"></div>
              <p className="mt-4 text-yellow-500 font-bold animate-pulse">Submitting Ticket...</p>
            </div>
          </div>
        )}

        {submitted && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-transparent p-6 rounded-lg shadow-lg flex flex-col items-center animate-ping">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-bounce"></path>
              </svg>
              <p className="mt-4 text-green-700 font-bold animate-bounce">Ticket Submitted Successfully!</p>
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
