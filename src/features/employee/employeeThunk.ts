// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { GetEmployeeResponse } from "../../types/employee/employeetypes";
// import { getAllEmployeesApi } from "./employeeApi";
// import { AxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployeePerformanceApi,
  getEmployeeTasksApi,
  requestExtensionApi,
  singleSubmissionApi,
  submitTaskApi,
  taskStatusSummaryEmployeeApi,
  updateEmployeeProfileApi,
  updateTaskStatusApi,
} from "./employeeApi";
import { AxiosError } from "axios";
import {
  EmployeePerformanceTypes,
  EmployeeTasksTypes,
  ExtensionRequestTypes,
  TaskStatusSummaryTypeEmployee,
  TaskSubmitTypes,
} from "../../types/employee/employeetypes";

// //get workshops
// export const getEmployeeThunk = createAsyncThunk<
//   GetEmployeeResponse,
//   { page: number; limit: number; sort?: string; search?: string },
//   { rejectValue: string }
// >(
//   "employee/getall",
//   async ({ page, limit, sort, search }, { rejectWithValue }) => {
//     try {
//       const res = await getAllEmployeesApi(page, limit, sort, search);
//       return res.data;
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       return rejectWithValue(
//         error?.response?.data?.message || "Employee fetch failed"
//       );
//     }
//   }
// );

// update employee profile
export const updateEmployeeProfileThunk = createAsyncThunk<
  { message: string },
  { data: { name?: string; profileImage?: string }; employeeId: string },
  { rejectValue: string }
>("employee/update", async ({ data, employeeId }, { rejectWithValue }) => {
  try {
    const res = await updateEmployeeProfileApi(data, employeeId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Employee fetch failed"
    );
  }
});

//get employee tasks
export const getEmployeeTasksThunk = createAsyncThunk<
  { tasks: EmployeeTasksTypes[] },
  { limit?: number; filter?: string; lastDate?: string; search?:string },
  { rejectValue: string }
>(
  "employee/gettasks",
  async ({ limit, filter, lastDate, search }, { rejectWithValue }) => {
    try {
      const res = await getEmployeeTasksApi(limit, filter, lastDate, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data.message || "Employee tsks fetch failed"
      );
    }
  }
);

//update task status
export const updateTaskStatusThunk = createAsyncThunk<
  { message: string; updatedTask: EmployeeTasksTypes },
  { taskId: string; status: string },
  { rejectValue: string }
>("admin/editTask", async ({ taskId, status }, { rejectWithValue }) => {
  try {
    const res = await updateTaskStatusApi(taskId, status);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task status update failed"
    );
  }
});

//submit task
export const submitTaskThunk = createAsyncThunk<
  { message: string; submittedTask: TaskSubmitTypes },
  TaskSubmitTypes,
  { rejectValue: string }
>("employee/submittask", async (details, { rejectWithValue }) => {
  try {
    const res = await submitTaskApi(details);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task submission failed"
    );
  }
});

// single submission
export const singleSubmissionThunk = createAsyncThunk<
  { submission: TaskSubmitTypes },
  string,
  { rejectValue: string }
>("admin/getsubmit", async (taskId, { rejectWithValue }) => {
  try {
    const res = await singleSubmissionApi(taskId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task submission failed"
    );
  }
});

//request extension
export const requestExtensionThunk = createAsyncThunk<
  { message: string; task: EmployeeTasksTypes },
  { taskId: string; details: ExtensionRequestTypes },
  { rejectValue: string }
>(
  "employee/request_extension",
  async ({ taskId, details }, { rejectWithValue }) => {
    try {
      const res = await requestExtensionApi(taskId, details);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Task extension request failed"
      );
    }
  }
);

// task summary employee
export const taskStatusSummaryEmployeeThunk = createAsyncThunk<
  TaskStatusSummaryTypeEmployee,
  "week" | "month" | "all" | undefined,
  { rejectValue: string }
>("employee/task-summary", async (filter = "week", { rejectWithValue }) => {
  try {
    const res = await taskStatusSummaryEmployeeApi(filter);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task extension request failed"
    );
  }
});

// get employee performance
export const getEmployeePerformanceThunk = createAsyncThunk<
  EmployeePerformanceTypes,
  void,
  { rejectValue: string }
>("employee/performance", async (_, { rejectWithValue }) => {
  try {
    const res = await getEmployeePerformanceApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Task extension request failed"
    );
  }
});
