import apiClient from "../../services/axiosInstance";
import { IUser } from "../../types";

export const updateUser = (data: Partial<IUser>) => {
  return apiClient.put("/user/update-profile", { data });
};
