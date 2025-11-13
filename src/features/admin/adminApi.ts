import apiClient from "../../services/axiosInstance";
import {
  EmployeeTasksTypes,
  EmployeeTypes,
} from "../../types/employee/employeetypes";

export const getAllEmployeesApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string,
  filters?: {
    designation?: string[];
    jobType?: string[];
    department?: string[];
  }
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (sort) params.append("sort", sort);
  if (search) params.append("search", search);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    });
  }

  return apiClient.get(`/admin/employee/all?${params.toString()}`);
};

//get single employee
export const getSingleEmployeeApi = (employeeId: string) => {
  if (employeeId) {
    return apiClient.get(`/admin/employee/single/${employeeId}`);
  }
};

// add employee
export const addEmployeeApi = (data: EmployeeTypes) => {
  return apiClient.post("/admin/employee/add", { data });
};

//update employee
export const editEmployeeApi = (data: EmployeeTypes, employeeId: string) => {
  return apiClient.put(`/admin/employee/update/${employeeId}`, data);
};

// assign task to employee
export const assignTaskToEmployeeApi = (
  data: EmployeeTasksTypes,
  employeeId: string
) => {
  return apiClient.post(`/admin/employee/task/assign/${employeeId}`, data);
};

//get all tasks
export const getAllTasksApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string,
  filters?: {
    designation?: string[];
    priority?: string[];
    department?: string[];
    status?: string[];
  }
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (sort) params.append("sort", sort);
  if (search) params.append("search", search);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    });
  }

  return apiClient.get(`/admin/employee/task?${params.toString()}`);
};

//get single task
export const getSingleTaskDetailsApi = (taskId: string) => {
  return apiClient.get(`/admin/employee/task/${taskId}`);
};

//edit task details
export const editTaskDetailsApi = (
  taskId: string,
  details: EmployeeTasksTypes
) => {
  return apiClient.put(`/admin/employee/task/update/${taskId}`, details);
};

//delete task
export const deleteTaskApi = (taskId: string) => {
  return apiClient.delete(`/admin/employee/task/delete/${taskId}`);
};

//handle task extension
export const handleTaskExtensionApi = (data: {
  taskId: string;
  status: string;
  dueDate: string;
}) => {
  return apiClient.put("/admin/employee/task/extension/update", data);
};

//employee job distributions
export const getEmployeeJobDistributionsApi = () => {
  return apiClient.get("/admin/employee/job/distributions");
};

// get employee task status summary
export const taskStatusSummaryApi = (filter: string, from?: boolean) => {
  const url = from
    ? `/admin/employee/task/status/summary/?filter=${filter}&from=${from}`
    : `/admin/employee/task/status/summary?filter=${filter}`;
  return apiClient.get(url);
};
