// import apiClient from "../../services/axiosInstance"

import apiClient from "../../services/axiosInstance";
import {
  ExtensionRequestTypes,
  TaskSubmitTypes,
} from "../../types/employee/employeetypes";

// export const getAllEmployeesApi = (
//   page: number,
//   limit: number,
//   sort?: string,
//   search?: string
// ) => {
//   return apiClient.get(
//     `/employee/all?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
//   );
// };

//update employee profile
export const updateEmployeeProfileApi = (
  data: { name?: string; profileImage?: string },
  employeeId: string
) => {
  return apiClient.put(`/employee/update/${employeeId}`, data);
};

//get employee tasks
export const getEmployeeTasksApi = (
  limit?: number,
  filter?: string,
  lastDate?: string,
  search?: string
) => {
  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());
  if (filter) params.append("filter", filter);
  if (lastDate) params.append("lastDate", lastDate);
  if (search) params.append("search", search);
  return apiClient.get(`/employee/task?${params.toString()}`);
};

//update task status
export const updateTaskStatusApi = (taskId: string, status: string) => {
  return apiClient.patch(`/employee/task/update-status/${taskId}`, { status });
};

//submit task
export const submitTaskApi = (details: TaskSubmitTypes) => {
  return apiClient.post(`/employee/task/submit`, details);
};

//view submission
export const singleSubmissionApi = (taskId: string) => {
  return apiClient.get(`/employee/task/submit/${taskId}`);
};

//request extension
export const requestExtensionApi = (
  taskId: string,
  details: ExtensionRequestTypes
) => {
  return apiClient.post(`/employee/task/extension/${taskId}`, details);
};

// task summary
export const taskStatusSummaryEmployeeApi = (filter?: string) => {
  return apiClient.get(`/employee/task/summary?filter=${filter}`);
};

// employee performance
export const getEmployeePerformanceApi = () => {
  return apiClient.get("/employee/performance")
}
