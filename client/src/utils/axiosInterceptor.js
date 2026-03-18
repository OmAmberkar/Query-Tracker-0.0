import axios from "axios";

const currentHost = window.location.hostname;
const isLocal = currentHost === "localhost" || 
                currentHost === "127.0.0.1" || 
                currentHost === "[::1]" || 
                currentHost.includes("192.168.") || 
                currentHost.includes(".local") ||
                currentHost === "";

if (process.env.NODE_ENV !== 'production') {
  console.log(`[NETWORK] Operational Host: ${currentHost}`);
  console.log(`[NETWORK] Mode: ${isLocal ? "LOCAL (4000)" : "REMOTE (Production)"}`);
}

const axiosInterceptor = axios.create({
  baseURL: isLocal ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000") : "https://query-tracker-server.onrender.com",
  withCredentials: true,
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    try {
      const email = localStorage.getItem("userEmail");
      const role = localStorage.getItem("userRole");

      if (email) config.headers["x-user-email"] = email;
      if (role) config.headers["x-user-role"] = role;
    } catch (e) {
      console.warn("Storage access restricted", e);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//Responce Interceptor
axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiry
    if (error.response?.status === 401) {
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  }
)

export default axiosInterceptor;