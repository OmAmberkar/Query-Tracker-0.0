import axios from "axios";

const axiosInterceptor = axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true,
});

//Request Interceptor
axiosInterceptor.interceptors.request.use(
  (config) => {
    // You could attach tokens here if you used JWT
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

//Responce Interceptor
axiosInterceptor.interceptors.response.use(
    (response) => response,
    (error) =>{
        // Handle session expiry
    if (error.response?.status === 401) {
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
    }
)

export default axiosInterceptor;