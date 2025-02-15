import { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ username, password, rememberMe });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center transition-all duration-700 overflow-hidden relative"
      style={{ backgroundImage: "url('./src/assets/Cool-Red-and-Black-Wallpaper-Computer.jpg')" }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-purple-900/50 to-black/70 animate-gradient-shift"></div>
      
      {/* Glass card */}
      <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 transform hover:scale-[1.01] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl blur opacity-20 x transition duration-300"></div>
        
        <h2 className="text-4xl font-bold pb-6 text-center text-white text-shadow-sm">Login</h2>
        
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="relative w-full group">
            <input
              type="text"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaUser />
            </span>
          </div>
          
          {/* Password input */}
          <div className="relative w-full group">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 pr-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          
          {/* Remember me and forgot password */}
          <div className="flex items-center justify-between">
            {/* <label className="flex items-center text-white group cursor-pointer">
              <input 
                type="checkbox" 
                className="mr-2 accent-red-600" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> 
              <span className="group-hover:text-red-300 transition-colors duration-300">Remember me</span>
            </label> */}
            {/* <span className="cursor-pointer text-white hover:text-red-300 transition-colors duration-300 relative inline-block group">
              <span>Forgot password?</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </span> */}
          </div>
          
          {/* Login button */}
          <button 
            type="submit" 
            className="mt-4 py-3 w-full rounded-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 active:from-red-700 active:to-purple-700 transition-all duration-300 text-white font-semibold transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            Login
          </button>
          
          {/* Register link */}
          <div className="text-center text-white mt-4 group">
            Don&apos;t have an account?{' '}
            <Link 
              to="/user/register" 
              className="font-medium text-red-400 hover:text-red-300 transition-colors duration-300 relative inline-block group-hover:underline"
            >
              <span>Register</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;