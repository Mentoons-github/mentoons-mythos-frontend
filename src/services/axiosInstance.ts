import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response.data.message,'error')
      if (error.response.status === 401 || error.response.data.message == 'jwt expired') {
        console.warn("Unauthorized - logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;