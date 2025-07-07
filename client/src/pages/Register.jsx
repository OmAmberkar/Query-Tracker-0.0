/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaUserAlt, FaLock, FaPhoneAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the styles

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password || value === '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    axios
      .post('http://localhost:4000/user/register', {
        name,
        username,
        email,
        contact,
        password
      })
      .then((result) => {
        toast.success('Registration Successful! Please login.');
        navigate('/user/login');
      })
      .catch((error) => {
        toast.error('Registration failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return ( 
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
 <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>

      

      <div className="relative bg-black/50  rounded-2xl p-8 w-full max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 transform hover:scale-[1.01]  transition-all duration-300">
        <h2 className="text-4xl font-bold pb-6 text-center text-white text-shadow-sm">Register</h2>
        
        {error && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${error.includes('Success') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
            {error}
          </div>
        )}
        
        <form className="flex flex-col space-y-3" onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="relative w-full group">
            <input
              type="text"
              name="name"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Full Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaUserAlt />
            </span>
          </div>

          {/* Username */}
          <div className="relative w-full group">
            <input
              type="text"
              name="username"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaUserAlt />
            </span>
          </div>

          {/* Email */}
          <div className="relative w-full group">
            <input
              type="email"
              name="email"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <MdOutlineMail />
            </span>
          </div>

          {/* Phone Number */}
          <div className="relative w-full group">
            <input
              type="tel"
              name="contact"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Phone Number"
              required
              onChange={(e) => setContact(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaPhoneAlt />
            </span>
          </div>

          {/* Password */}
          <div className="relative w-full group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 pr-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaLock />
            </span>
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className={`border ${!passwordMatch ? 'border-red-500' : 'border-gray-400/30'} w-full rounded-full py-3 px-4 pl-10 pr-10 bg-black/20 focus:outline-none focus:ring-2 ${!passwordMatch ? 'focus:ring-red-500' : 'focus:ring-red-500/50'} text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50`}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaLock />
            </span>
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {!passwordMatch && (
            <p className="text-red-400 text-sm -mt-1">Passwords do not match</p>
          )}

          {/* Register Button */}
          <button 
            type="submit"
            className="mt-6 py-3 w-full rounded-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 active:from-red-700 active:to-purple-700 focus:outline-none text-white font-semibold tracking-wide text-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link to="/user/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;