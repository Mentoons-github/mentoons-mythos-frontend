import { createSlice } from "@reduxjs/toolkit";
import {
  AllEmployeeAttendance,
  AllRequestCountStatus,
  AttendanceTypes,
  LastFiveDaysSummary,
  LeaveTypes,
  SummaryTypes,
} from "../../types/employee/attendance&leaveTypes";
import {
  applyLeaveThunk,
  checkInThunk,
  checkOutThunk,
  editAttendanceDetailsThunk,
  getAllLeaveRequestsThunk,
  getEmployeeAttendanceThunk,
  getEmployeeLeaveRequestsThunk,
  getLastFiveDaysAttendanceSummaryThunk,
  getSingleLeaveRequestThunk,
  getThisWeekAttendanceThunk,
  getTodayAttendaceThunk,
  getTodayAttendanceAllEmployeesThunk,
  updateLeaveRequestStatusThunk,
} from "./attendance_leaveThunk";

interface AttendanceState {
  loading: boolean;
  checkLoading: boolean;
  error: null | string;
  message: string;
  success: boolean;
  checkSuccess: boolean;
  employeeAttendance: AttendanceTypes[];
  todayAttendance: AttendanceTypes | null;
  hasMore: boolean;
  lastFetchedDate: string | null;
  summary: SummaryTypes | null;
  weekSummary: SummaryTypes | null;
  allEmployeeAttendance: AllEmployeeAttendance[];
  allEmployeeSummary: SummaryTypes | null;
  page: number;
  totalPages: number;
  editSuccess: boolean;
  editLoading: boolean;
  applyLeaveSuccess: boolean;
  applyLeaveLoading: boolean;
  employeeRequestPage: number;
  employeeRequestTotalPages: number;
  employeeLeaveRequests: LeaveTypes[];
  allLeaveRequests: LeaveTypes[];
  allRequestPage: number;
  allRequestTotalPage: number;
  allRequestCounts: AllRequestCountStatus | null;
  singleLoading: boolean;
  singleLeaveRequest: LeaveTypes | null;
  leaveRequestId: string;
  lastFiveDaySummary: LastFiveDaysSummary[];
}

const initialState: AttendanceState = {
  error: null,
  loading: false,
  checkLoading: false,
  checkSuccess: false,
  message: "",
  success: false,
  employeeAttendance: [],
  todayAttendance: null,
  hasMore: true,
  lastFetchedDate: null,
  summary: null,
  weekSummary: null,
  allEmployeeAttendance: [],
  allEmployeeSummary: null,
  page: 0,
  totalPages: 0,
  editLoading: false,
  editSuccess: false,
  applyLeaveLoading: false,
  applyLeaveSuccess: false,
  employeeRequestPage: 0,
  employeeRequestTotalPages: 0,
  employeeLeaveRequests: [],
  allLeaveRequests: [],
  allRequestPage: 0,
  allRequestTotalPage: 0,
  allRequestCounts: null,
  singleLoading: false,
  singleLeaveRequest: null,
  leaveRequestId: "",
  lastFiveDaySummary: [],
};

const attendanceSlice = createSlice({
  name: "attendance_leave",
  initialState,
  reducers: {
    resetAttendanceState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
      state.message = "";
      state.checkLoading = false;
      state.checkSuccess = false;
      state.editLoading = false;
      state.editSuccess = false;
      state.applyLeaveLoading = false;
      state.applyLeaveSuccess = false;
      state.singleLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      //check-in
      .addCase(checkInThunk.pending, (state) => {
        state.checkLoading = true;
        state.error = null;
        state.checkSuccess = false;
      })
      .addCase(checkInThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.checkSuccess = true;
        state.checkLoading = false;
        const attendance = action.payload.attendance;
        state.todayAttendance = attendance;
        if (attendance?._id) {
          state.employeeAttendance = state.employeeAttendance.map((atte) =>
            atte._id === attendance._id ? attendance : atte
          );
        }
      })
      .addCase(checkInThunk.rejected, (state, action) => {
        state.checkLoading = false;
        state.error = action.payload as string;
        state.checkSuccess = false;
      })

      //check-out
      .addCase(checkOutThunk.pending, (state) => {
        state.checkLoading = true;
        state.error = null;
        state.checkSuccess = false;
      })
      .addCase(checkOutThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.checkSuccess = true;
        state.checkLoading = false;
        const attendance = action.payload.attendance;
        state.todayAttendance = attendance;
        if (attendance?._id) {
          state.employeeAttendance = state.employeeAttendance.map((atte) =>
            atte._id === attendance._id ? attendance : atte
          );
        }
      })
      .addCase(checkOutThunk.rejected, (state, action) => {
        state.checkLoading = false;
        state.error = action.payload as string;
        state.checkSuccess = false;
      })

      //today attendance
      .addCase(getTodayAttendaceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTodayAttendaceThunk.fulfilled, (state, action) => {
        state.todayAttendance = action.payload;
        state.error = null;
        state.success = true;
        state.loading = false;
      })
      .addCase(getTodayAttendaceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get employee all
      .addCase(getEmployeeAttendanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeAttendanceThunk.fulfilled, (state, action) => {
        if (action.meta.arg.lastFetchedDate) {
          state.employeeAttendance = [
            ...state.employeeAttendance,
            ...action.payload.attendance,
          ];
        } else {
          state.employeeAttendance = action.payload.attendance;
        }

        state.error = null;
        state.success = true;
        state.loading = false;
        state.hasMore = action.payload.hasMore;
        state.lastFetchedDate = action.payload.lastFetchedDate;
        state.summary = action.payload.summary;
      })
      .addCase(getEmployeeAttendanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get this week attendance
      .addCase(getThisWeekAttendanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getThisWeekAttendanceThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.weekSummary = action.payload;
      })
      .addCase(getThisWeekAttendanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get today all employees attendance
      .addCase(getTodayAttendanceAllEmployeesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        getTodayAttendanceAllEmployeesThunk.fulfilled,
        (state, action) => {
          state.error = null;
          state.success = true;
          state.loading = false;
          state.allEmployeeAttendance = action.payload.attendance;
          state.allEmployeeSummary = action.payload.summary;
          state.page = action.payload.pagination.page;
          state.totalPages = action.payload.pagination.totalPages;
        }
      )
      .addCase(
        getTodayAttendanceAllEmployeesThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.success = false;
        }
      )

      // edit attendance
      .addCase(editAttendanceDetailsThunk.pending, (state) => {
        state.editLoading = true;
        state.error = null;
        state.editSuccess = false;
      })
      .addCase(editAttendanceDetailsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.editSuccess = true;
        state.editLoading = false;
        state.message = action.payload.message;
        const editedAttendance = action.payload.edited;
        if (editedAttendance._id) {
          state.employeeAttendance = state.employeeAttendance.map(
            (attendance) =>
              attendance._id === editedAttendance._id
                ? editedAttendance
                : attendance
          );
        }
      })
      .addCase(editAttendanceDetailsThunk.rejected, (state, action) => {
        state.editLoading = false;
        state.error = action.payload as string;
        state.editSuccess = false;
      })

      //apply for leave
      .addCase(applyLeaveThunk.pending, (state) => {
        state.applyLeaveLoading = true;
        state.error = null;
        state.applyLeaveSuccess = false;
      })
      .addCase(applyLeaveThunk.fulfilled, (state, action) => {
        state.error = null;
        state.applyLeaveSuccess = true;
        state.applyLeaveLoading = false;
        state.message = action.payload.message;
        const leaveRequest = action.payload.leaveData;
        state.employeeLeaveRequests.unshift(leaveRequest);
        state.leaveRequestId = leaveRequest?._id as string;
      })
      .addCase(applyLeaveThunk.rejected, (state, action) => {
        state.applyLeaveLoading = false;
        state.error = action.payload as string;
        state.applyLeaveSuccess = false;
      })

      //employee leave requests
      .addCase(getEmployeeLeaveRequestsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getEmployeeLeaveRequestsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.employeeRequestPage = action.payload.page;
        state.employeeRequestTotalPages = action.payload.totalPage;
        state.employeeLeaveRequests = action.payload.leaveRequests;
      })
      .addCase(getEmployeeLeaveRequestsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get all leave requests
      .addCase(getAllLeaveRequestsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllLeaveRequestsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.allRequestPage = action.payload.page;
        state.allRequestTotalPage = action.payload.totalPage;
        state.allLeaveRequests = action.payload.leaveRequests;
        state.allRequestCounts = action.payload.countByStatus;
      })
      .addCase(getAllLeaveRequestsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //single leave request
      .addCase(getSingleLeaveRequestThunk.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleLeaveRequestThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.singleLoading = false;
        state.singleLeaveRequest = action.payload;
      })
      .addCase(getSingleLeaveRequestThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //update leave request status
      .addCase(updateLeaveRequestStatusThunk.pending, (state) => {
        state.editLoading = true;
        state.error = null;
        state.editSuccess = false;
      })
      .addCase(updateLeaveRequestStatusThunk.fulfilled, (state, action) => {
        state.error = null;
        state.editSuccess = true;
        state.editLoading = false;
        state.message = action.payload.message;
        const updatedRequest = action.payload.leaveRequest;
        if (updatedRequest._id) {
          state.allLeaveRequests = state.allLeaveRequests.map((req) =>
            req._id == updatedRequest._id ? updatedRequest : req
          );
        }
      })
      .addCase(updateLeaveRequestStatusThunk.rejected, (state, action) => {
        state.editLoading = false;
        state.error = action.payload as string;
        state.editSuccess = false;
      })

      // last five days attendance summary
      .addCase(getLastFiveDaysAttendanceSummaryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        getLastFiveDaysAttendanceSummaryThunk.fulfilled,
        (state, action) => {
          state.error = null;
          state.success = true;
          state.loading = false;
          state.lastFiveDaySummary = action.payload.details;
        }
      )
      .addCase(
        getLastFiveDaysAttendanceSummaryThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.success = false;
        }
      );
  },
});

export default attendanceSlice.reducer;
export const { resetAttendanceState } = attendanceSlice.actions;
