import apiClient from "../../services/axiosInstance";
import { IUser } from "../../types";

export const sunMoonSign = (data: IUser) => {
  return apiClient.put("/user/update-profile", { data });
};
