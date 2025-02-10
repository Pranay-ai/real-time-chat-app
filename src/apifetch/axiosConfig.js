import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log("Session expired, logging out...");
      window.location.href = "/sign-in"; 
    }
    return Promise.reject(error);
  }
);

export default api;
