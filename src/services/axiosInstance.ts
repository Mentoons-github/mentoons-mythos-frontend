import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DEV_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response.data.message, "error");

      if (
        error.response.status === 401 ||
        error.response.data.message === "jwt expired"
      ) {
        console.warn("Unauthorized - logging out...");

        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
