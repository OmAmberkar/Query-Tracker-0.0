import React from 'react';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('./src/assets/Cool-Red-and-Black-Wallpaper-Computer.jpg')" }}
    >
      {/* Blurred container */}
      <div className="bg-transparent bg-opacity-20 backdrop-blur-2xl rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold pb-6 text-center text-white">Register</h2>
        <form className="flex flex-col">
          {/* Full Name */}
          <div className="relative w-full">
            <input
              type="text"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Full Name"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaUser />
            </span>
          </div>

          {/* Username */}
          <div className="relative w-full">
            <input
              type="text"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Username"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaUser />
            </span>
          </div>

          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Email"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <MdMail />
            </span>
          </div>

          {/* Phone Number */}
          <div className="relative w-full">
            <input
              type="tel"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Phone Number"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaPhone />
            </span>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type="password"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Password"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaLock />
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              type="password"
              className="border border-gray-400 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Confirm Password"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaLock />
            </span>
          </div>

          {/* Register Button */}
          <button className="my-2 py-2 w-full rounded-full bg-red-600 hover:bg-red-700 transition text-white">
            Register
          </button>

          {/* Already have an account? */}
          <span className="text-center text-white">
            Already have an account?{' '}
            <Link to="/login" className="cursor-pointer text-gray-300 underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
