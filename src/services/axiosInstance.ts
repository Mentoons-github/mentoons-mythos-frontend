import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DEV_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const plainAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DEV_URL}/api/v1`,
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

    const is401 = error.response?.status === 401;
    const isNotRefreshCall = !originalRequest.url?.includes(
      "/auth/get-access-token"
    );
    const isNotRetried = !originalRequest._retry;

    if (is401 && isNotRefreshCall && isNotRetried) {
      originalRequest._retry = true;

      try {
        await plainAxios.get("/auth/get-access-token");

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh token failed. Redirecting to login.");

        try {
          await plainAxios.post("/auth/logout");
        } catch (logoutError) {
          console.warn("Logout failed:", logoutError);
        }

        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
