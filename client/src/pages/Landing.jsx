/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import "@fontsource/comic-neue";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-500 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
          Query Tracker
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto">
          Track, manage, and resolve your queries efficiently with our simple and powerful ticket management system.
        </p>

        <div className="flex gap-6 justify-center">
          <motion.a
            href="/user/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-500 transition"
          >
            Register
          </motion.a>
          <motion.a
            href="/user/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-500 transition"
          >
            Login
          </motion.a>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Query Tracker. All rights reserved.
      </div>
    </div>
  );
}

export default Landing;
