import apiClient from "../../../services/axiosInstance";
import { ReportResponse } from "../../../types/redux/reportInterface";

export const fetchUserDetails = () => {
  return apiClient.get("/user");
};

export const fetchAllUsersApi = () => {
  return apiClient.get('/user/all-users')
}

export const blockUserApi = (userId:string) => {
  return apiClient.put(`/user/block/${userId}`)
}

export const logout = () => {
  return apiClient.post("/auth/logout");
};

export const reportUserApi = (data:ReportResponse, userId:string) => {
  return apiClient.post(`/user/report/${userId}`,data)
}
