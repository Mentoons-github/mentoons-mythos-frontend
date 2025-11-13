import { createSlice } from "@reduxjs/toolkit";
import {
  getEmployeePerformanceThunk,
  getEmployeeTasksThunk,
  requestExtensionThunk,
  singleSubmissionThunk,
  submitTaskThunk,
  taskStatusSummaryEmployeeThunk,
  updateEmployeeProfileThunk,
  updateTaskStatusThunk,
} from "./employeeThunk";
import {
  EmployeePerformanceTypes,
  EmployeeTasksTypes,
  TaskStatusSummaryType,
  TaskSubmitTypes,
} from "../../types/employee/employeetypes";

interface EmployeeState {
  loading: boolean;
  error: null | string;
  message: string;
  success: boolean;
  tasks: EmployeeTasksTypes[];
  updateLoading: boolean;
  updateSuccess: boolean;
  submitLoading: boolean;
  submitSuccess: boolean;
  submission: TaskSubmitTypes | null;
  activeTasks: EmployeeTasksTypes[];
  taskStatusSummary: TaskStatusSummaryType[];
  taskStatusTotalCount: number;
  hasMore: boolean;
  loadMoreLoading: boolean;
  performanceScore: EmployeePerformanceTypes | null;
}

const initialState: EmployeeState = {
  error: null,
  loading: false,
  message: "",
  success: false,
  tasks: [],
  updateLoading: false,
  updateSuccess: false,
  submitLoading: false,
  submitSuccess: false,
  submission: null,
  activeTasks: [],
  taskStatusSummary: [],
  taskStatusTotalCount: 0,
  hasMore: false,
  loadMoreLoading: false,
  performanceScore: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetEmployeeState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
      state.updateLoading = false;
      state.updateSuccess = false;
      state.submitLoading = false;
      state.submitSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEmployeeProfileThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.success = true;
      })
      .addCase(updateEmployeeProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get tasks
      .addCase(getEmployeeTasksThunk.pending, (state, action) => {
        if (action.meta.arg.lastDate) {
          state.loadMoreLoading = true;
        } else {
          state.loading = true;
        }
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeTasksThunk.fulfilled, (state, action) => {
        if (action.meta.arg.lastDate) {
          state.loadMoreLoading = false;
          state.tasks = [...(state.tasks || []), ...action.payload.tasks];
        } else {
          state.loading = false;
          state.tasks = action.payload.tasks;
        }
        state.hasMore = action.payload.tasks.length === action.meta.arg.limit;
        state.error = null;
        state.success = true;
      })
      .addCase(getEmployeeTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.loadMoreLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //update task status
      .addCase(updateTaskStatusThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedTask = action.payload.updatedTask;
        if (updatedTask?._id) {
          state.tasks = state.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );
          // if (state.singleTask?._id === updatedTask._id) {
          //   state.singleTask = updatedTask;
          // }
        }
      })
      .addCase(updateTaskStatusThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      })

      // submit task
      .addCase(submitTaskThunk.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitTaskThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.submitLoading = false;
        state.submitSuccess = true;
      })
      .addCase(submitTaskThunk.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload as string;
        state.submitSuccess = false;
      })

      //single submission
      .addCase(singleSubmissionThunk.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(singleSubmissionThunk.fulfilled, (state, action) => {
        state.submission = action.payload.submission;
        state.error = null;
        state.submitLoading = false;
        state.success = true;
      })
      .addCase(singleSubmissionThunk.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //request extension
      .addCase(requestExtensionThunk.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(requestExtensionThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.submitLoading = false;
        state.submitSuccess = true;
        const updatedTask = action.payload.task;
        if (updatedTask?._id) {
          state.tasks = state.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );
          // if (state.singleTask?._id === updatedTask._id) {
          //   state.singleTask = updatedTask;
          // }
        }
      })
      .addCase(requestExtensionThunk.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload as string;
        state.submitSuccess = false;
      })

      // task status summary employee
      .addCase(taskStatusSummaryEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(taskStatusSummaryEmployeeThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.taskStatusTotalCount = action.payload.totalCount;
        state.activeTasks = action.payload.activeTasks;
        state.taskStatusSummary = action.payload.summary;
      })
      .addCase(taskStatusSummaryEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // employee performance
      .addCase(getEmployeePerformanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeePerformanceThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.performanceScore = action.payload;
      })
      .addCase(getEmployeePerformanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default employeeSlice.reducer;
export const { resetEmployeeState } = employeeSlice.actions;
