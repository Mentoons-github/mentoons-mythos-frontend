import apiClient from "../../../services/axiosInstance";
import { IUser } from "../../../types";
import { ReportResponse } from "../../../types/redux/reportInterface";

export const fetchUserDetails = () => {
  return apiClient.get("/user");
};

export const fetchAllUsersApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string,
  filterBy?: string,
  filterValue?: string
) => {
  return apiClient.get(
    `/user/all-users?page=${page}&limit=${limit}&sort=${sort}&search=${search}&filterBy=${filterBy}&filterValue=${filterValue}`
  );
};

export const fetchUserCountApi = () => {
  return apiClient.get("/user/count");
};

export const blockUserApi = (userId: string) => {
  return apiClient.put(`/user/block/${userId}`);
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};

export const reportUserApi = (data: ReportResponse, userId: string) => {
  return apiClient.post(`/user/report/${userId}`, data);
};

export const updateUser = (data: Partial<IUser>) => {
  return apiClient.put("/user/update-profile", { data });
};

export const fetchSingleUserApi = (userId: string) => {
  return apiClient.get(`/user/single-user/${userId}`);
};
