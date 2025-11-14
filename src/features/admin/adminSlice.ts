import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeThunk,
  assignTaskToEmployeeThunk,
  deleteTaskThunk,
  editEmployeeThunk,
  editTaskDetailsThunk,
  getAllTasksThunk,
  getEmployeeJobDistributionsThunk,
  getEmployeeThunk,
  getSingleEmployeeThunk,
  getSingleTaskDetailsThunk,
  handleTaskExtensionThunk,
  taskStatusSummaryThunk,
} from "./adminThunk";
import {
  EmployeeJobDistribution,
  EmployeeTasksTypes,
  EmployeeTypes,
  TaskStatusSummaryType,
} from "../../types/employee/employeetypes";

interface AdminEmployeeState {
  allLoading: boolean;
  employees: EmployeeTypes[];
  singleEmployee: EmployeeTypes | null;
  singleLoading: boolean;
  error: null | string;
  message: string;
  employeePage: number;
  employeeTotalPage: number;
  success: boolean;
  addSuccess: boolean;
  addLoading: boolean;
  updateLoading: boolean;
  updateSuccess: boolean;
  tasks: EmployeeTasksTypes[];
  taskPage: number;
  taskTotalPage: number;
  singleTask: EmployeeTasksTypes | null;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  loading: boolean;
  jobDistribution: EmployeeJobDistribution | null;
  totalEmployee: number;
  taskStatusSummary: TaskStatusSummaryType[];
  totalTaskCount:number
}

const initialState: AdminEmployeeState = {
  allLoading: false,
  employees: [],
  singleEmployee: null,
  singleLoading: false,
  error: null,
  employeePage: 0,
  employeeTotalPage: 0,
  message: "",
  success: false,
  addSuccess: false,
  addLoading: false,
  updateLoading: false,
  updateSuccess: false,
  tasks: [],
  taskPage: 0,
  taskTotalPage: 0,
  singleTask: null,
  deleteLoading: false,
  deleteSuccess: false,
  loading: false,
  jobDistribution: null,
  totalEmployee: 0,
  taskStatusSummary: [],
  totalTaskCount:0
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.allLoading = false;
      state.error = null;
      state.success = false;
      state.addSuccess = false;
      state.addLoading = false;
      state.updateLoading = false;
      state.updateSuccess = false;
      state.message = "";
      state.singleLoading = false;
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //get all employees
      .addCase(getEmployeeThunk.pending, (state) => {
        state.allLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeThunk.fulfilled, (state, action) => {
        state.allLoading = false;
        state.error = null;
        state.employees = action.payload.employees;
        state.employeePage = action.payload.page;
        state.employeeTotalPage = action.payload.totalPages;
        state.success = true;
      })
      .addCase(getEmployeeThunk.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get single employee
      .addCase(getSingleEmployeeThunk.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleEmployeeThunk.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.error = null;
        state.singleEmployee = action.payload?.employee;
        state.success = true;
      })
      .addCase(getSingleEmployeeThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //add employee
      .addCase(addEmployeeThunk.pending, (state) => {
        state.addLoading = true;
        state.error = null;
        state.addSuccess = false;
      })
      .addCase(addEmployeeThunk.fulfilled, (state, action) => {
        state.addLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.addSuccess = true;
        const newEmployee = action.payload.employee;
        state.employees.unshift(newEmployee);
      })
      .addCase(addEmployeeThunk.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
        state.addSuccess = false;
      })

      //update employee
      .addCase(editEmployeeThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(editEmployeeThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedEmployee = action.payload.updatedEmployee;
        if (updatedEmployee?._id) {
          state.employees = state.employees.map((employee) =>
            employee._id === updatedEmployee._id ? updatedEmployee : employee
          );
          if (state.singleEmployee?._id === updatedEmployee._id) {
            state.singleEmployee = updatedEmployee;
          }
        }
      })
      .addCase(editEmployeeThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      })

      //assign task
      .addCase(assignTaskToEmployeeThunk.pending, (state) => {
        state.addLoading = true;
        state.error = null;
        state.addSuccess = false;
      })
      .addCase(assignTaskToEmployeeThunk.fulfilled, (state, action) => {
        state.addLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.addSuccess = true;
        const newTask = action.payload.task;
        state.tasks.unshift(newTask);
      })
      .addCase(assignTaskToEmployeeThunk.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
        state.addSuccess = false;
      })

      //get all types
      .addCase(getAllTasksThunk.pending, (state) => {
        state.allLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        state.allLoading = false;
        state.error = null;
        state.tasks = action.payload.tasks;
        state.taskPage = action.payload.page;
        state.taskTotalPage = action.payload.totalPages;
        state.success = true;
      })
      .addCase(getAllTasksThunk.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get single task
      .addCase(getSingleTaskDetailsThunk.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleTaskDetailsThunk.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.error = null;
        state.singleTask = action.payload?.task;
        state.success = true;
      })
      .addCase(getSingleTaskDetailsThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //update task
      .addCase(editTaskDetailsThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(editTaskDetailsThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedTask = action.payload.updatedTask;
        if (updatedTask?._id) {
          state.tasks = state.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );
          if (state.singleTask?._id === updatedTask._id) {
            state.singleTask = updatedTask;
          }
        }
      })
      .addCase(editTaskDetailsThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      })

      //delete task
      .addCase(deleteTaskThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.message = action.payload;
        state.deleteSuccess = true;

        if (action.meta.arg) {
          state.tasks = state.tasks.filter(
            (task) => task._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
        state.deleteSuccess = false;
      })

      //handle exted task
      .addCase(handleTaskExtensionThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(handleTaskExtensionThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedTask = action.payload.task;
        if (updatedTask?._id) {
          state.tasks = state.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );
          if (state.singleTask?._id === updatedTask._id) {
            state.singleTask = updatedTask;
          }
        }
      })
      .addCase(handleTaskExtensionThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      })

      //get job distribution
      .addCase(getEmployeeJobDistributionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeJobDistributionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.jobDistribution = action.payload.formatted;
        state.totalEmployee = action.payload.totalEmployee;
      })
      .addCase(getEmployeeJobDistributionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //task staus summary
      .addCase(taskStatusSummaryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(taskStatusSummaryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.taskStatusSummary = action.payload.summary;
        state.totalTaskCount = action.payload.totalCount
      })
      .addCase(taskStatusSummaryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default adminSlice.reducer;
export const { resetAdminState } = adminSlice.actions;
