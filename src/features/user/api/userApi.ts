import apiClient from "../../../services/axiosInstance";

export const fetchUserDetails = () => {
  return apiClient.get("/user");
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};
