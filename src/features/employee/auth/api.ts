import apiClient from "../../../services/axiosInstance";
import { EmployeeLogin } from "../../../types/employee";

export const loginEmployee = (data: EmployeeLogin) => {
  return apiClient.post("/employee/login", data);
};
