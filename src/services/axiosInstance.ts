import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DEV_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.get("/auth/get-access-token", {
          withCredentials: true,
        });

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh token expired. Redirecting to login.");
        await apiClient.post("/auth/logout");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
