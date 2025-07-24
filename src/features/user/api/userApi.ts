import apiClient from "../../../services/axiosInstance";
import { ReportResponse } from "../../../types/redux/reportInterface";

export const fetchUserDetails = () => {
  return apiClient.get("/user");
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};

export const reportUserApi = (data:ReportResponse, userId:string) => {
  return apiClient.post(`/user/report/${userId}`,data)
}
