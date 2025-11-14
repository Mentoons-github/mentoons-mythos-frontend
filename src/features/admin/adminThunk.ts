import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  EmployeeJobDistribution,
  EmployeeTasksTypes,
  EmployeeTypes,
  GetEmployeeResponse,
  GetTaskResponse,
  TaskStatusSummaryType,
} from "../../types/employee/employeetypes";
import { AxiosError } from "axios";
import {
  addEmployeeApi,
  assignTaskToEmployeeApi,
  deleteTaskApi,
  editEmployeeApi,
  editTaskDetailsApi,
  getAllEmployeesApi,
  getAllTasksApi,
  getEmployeeJobDistributionsApi,
  getSingleEmployeeApi,
  getSingleTaskDetailsApi,
  handleTaskExtensionApi,
  taskStatusSummaryApi,
} from "./adminApi";

//get employees
export const getEmployeeThunk = createAsyncThunk<
  GetEmployeeResponse,
  {
    page: number;
    limit: number;
    sort?: string;
    search?: string;
    filters?: {
      designation?: string[];
      jobType?: string[];
      department?: string[];
      // status?: string;
    };
  },
  { rejectValue: string }
>(
  "admin/getallEmployee",
  async ({ page, limit, sort, search, filters }, { rejectWithValue }) => {
    try {
      const res = await getAllEmployeesApi(page, limit, sort, search, filters);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Employee fetch failed"
      );
    }
  }
);

//get shingle employee
export const getSingleEmployeeThunk = createAsyncThunk<
  { employee: EmployeeTypes },
  string,
  { rejectValue: string }
>("admin/singleEmployee", async (employeeId, { rejectWithValue }) => {
  try {
    const res = await getSingleEmployeeApi(employeeId);
    return res?.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Employee fetch failed"
    );
  }
});

//add employees
export const addEmployeeThunk = createAsyncThunk<
  { message: string; employee: EmployeeTypes },
  EmployeeTypes,
  { rejectValue: string }
>("admin/addEmployee", async (data, { rejectWithValue }) => {
  try {
    const res = await addEmployeeApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Employee add failed"
    );
  }
});

//update employee
export const editEmployeeThunk = createAsyncThunk<
  { message: string; updatedEmployee: EmployeeTypes },
  { data: EmployeeTypes; employeeId: string },
  { rejectValue: string }
>("admin/editEmployee", async ({ data, employeeId }, { rejectWithValue }) => {
  try {
    const res = await editEmployeeApi(data, employeeId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Employee update failed"
    );
  }
});

//assign task to employee
export const assignTaskToEmployeeThunk = createAsyncThunk<
  { message: string; task: EmployeeTasksTypes },
  { data: EmployeeTasksTypes; employeeId: string },
  { rejectValue: string }
>("admin/assign_task", async ({ data, employeeId }, { rejectWithValue }) => {
  try {
    const res = await assignTaskToEmployeeApi(data, employeeId);
    console.log(res.data.task, "tasskkkkkkk");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task assigning failed"
    );
  }
});

//get employees
export const getAllTasksThunk = createAsyncThunk<
  GetTaskResponse,
  {
    page: number;
    limit: number;
    sort?: string;
    search?: string;
    filters?: {
      designation?: string[];
      priority?: string[];
      department?: string[];
      status?: string[];
    };
  },
  { rejectValue: string }
>(
  "admin/getallTasks",
  async ({ page, limit, sort, search, filters }, { rejectWithValue }) => {
    try {
      const res = await getAllTasksApi(page, limit, sort, search, filters);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Tasks fetch failed"
      );
    }
  }
);

//get shingle task
export const getSingleTaskDetailsThunk = createAsyncThunk<
  { task: EmployeeTasksTypes },
  string,
  { rejectValue: string }
>("admin/singleTask", async (taskId, { rejectWithValue }) => {
  try {
    const res = await getSingleTaskDetailsApi(taskId);
    return res?.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Employee fetch failed"
    );
  }
});

//update task
export const editTaskDetailsThunk = createAsyncThunk<
  { message: string; updatedTask: EmployeeTasksTypes },
  { data: EmployeeTasksTypes; taskId: string },
  { rejectValue: string }
>("admin/editTask", async ({ taskId, data }, { rejectWithValue }) => {
  try {
    const res = await editTaskDetailsApi(taskId, data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task update failed"
    );
  }
});

//delete task
export const deleteTaskThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    const res = await deleteTaskApi(taskId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task delete failed"
    );
  }
});

//extend task
export const handleTaskExtensionThunk = createAsyncThunk<
  { message: string; task: EmployeeTasksTypes },
  { taskId: string; status: string; dueDate: string },
  { rejectValue: string }
>(
  "admin/handle_extension",
  async ({ taskId, status, dueDate }, { rejectWithValue }) => {
    try {
      const res = await handleTaskExtensionApi({ taskId, status, dueDate });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Extension update failed"
      );
    }
  }
);

// get employee job distributions
export const getEmployeeJobDistributionsThunk = createAsyncThunk<
  { formatted: EmployeeJobDistribution; totalEmployee: number },
  void,
  { rejectValue: string }
>("admin/employee/job-distribution", async (_, { rejectWithValue }) => {
  try {
    const res = await getEmployeeJobDistributionsApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Job distribution fetch faild"
    );
  }
});

//get employee task status sumary
export const taskStatusSummaryThunk = createAsyncThunk<
  {summary:TaskStatusSummaryType[], totalCount:number},
  {filter:string, from?:boolean},
  { rejectValue: string }
>("admin/employee/task-status", async ({filter,from}, { rejectWithValue }) => {
  try {
    const res = await taskStatusSummaryApi(filter,from);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Job distribution fetch faild"
    );
  }
});
