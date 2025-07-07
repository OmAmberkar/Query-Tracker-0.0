import { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showToast } from '../components/notification.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/user/login", { email, password });
      const { role } = response.data;
      showToast("Login successful!", "success");
      Cookies.set('email', email, { expires: 1 });

      if (role === "admin") {
        navigate("/user/getTickets");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      <div className="relative bg-black/50 rounded-2xl p-8 w-full max-w-md shadow-lg border border-white/10">
        <h2 className="text-4xl font-bold pb-6 text-center text-white">Login</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <input
              type="email"
              className="border border-gray-400 w-full rounded-full py-3 px-4 pl-10 bg-black/20 text-white"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
              <FaUser />
            </span>
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-400 w-full rounded-full py-3 px-4 pl-10 pr-10 bg-black/20 text-white"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
              <FaLock />
            </span>
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button 
            type="submit"
            className="mt-6 py-3 w-full rounded-full bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-3 text-sm text-white text-center">
            Don&apos;t have an account?  
            <button
              onClick={() => navigate("/user/register")}
              className="font-semibold text-red-500 ml-1"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;