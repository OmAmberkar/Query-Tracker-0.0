import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center transition-opacity duration-500"
      style={{ backgroundImage: "url('./src/assets/Cool-Red-and-Black-Wallpaper-Computer.jpg')" }}
    >
      {/* Blurred background container */}
      <div className="bg-transparent backdrop-blur-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold pb-6 text-center text-white">Login</h2>
        <form className="flex flex-col">
          {/* Username */}
          <div className="relative w-full">
            <input
              type="text"
              className="border border-gray-300 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Username"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaUser />
            </span>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type="password"
              className="border border-gray-300 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none text-white placeholder-white"
              placeholder="Password"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">
              <FaLock />
            </span>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between my-2">
            <label className="flex items-center text-white">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <span className="cursor-pointer text-gray-300 underline">Forgot password?</span>
          </div>

          {/* Login Button */}
          <button className="my-2 py-2 w-full rounded-full bg-red-600 hover:bg-red-700 transition text-white">
            Login
          </button>

          {/* Register Link */}
          <span className="text-center text-white">
            Don't have an account?{' '}
            <Link to="/register" className="cursor-pointer text-gray-300 underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
