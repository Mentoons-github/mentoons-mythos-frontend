import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyLeaveApi,
  checkInApi,
  checkOutApi,
  editAttendanceDetailsApi,
  getAllLeaveRequestsApi,
  getEmployeeAttendanceApi,
  getEmployeeLeaveRequestsApi,
  getLastFiveDaysAttendanceSummaryApi,
  getSingleLeaveRequestApi,
  getThisWeekAttendanceApi,
  getTodayAttendaceApi,
  getTodayAttendanceAllEmployeesApi,
  updateLeaveRequestStatusApi,
} from "./attendance_leaveApi";
import { AxiosError } from "axios";
import {
  AllEmployeeAttendance,
  AllLeaveRequestRequests,
  AllLeaveRequestResponse,
  AttendanceTypes,
  EmployeeLeaveRequestRequests,
  EmployeeLeaveRequestResponse,
  LastFiveDaysSummary,
  LeaveTypes,
  SummaryTypes,
} from "../../types/employee/attendance&leaveTypes";

//check-in
export const checkInThunk = createAsyncThunk<
  { attendance: AttendanceTypes; message: string },
  void,
  { rejectValue: string }
>("attendance/check-in", async (_, { rejectWithValue }) => {
  try {
    const res = await checkInApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant Check-in");
  }
});

//check-out
export const checkOutThunk = createAsyncThunk<
  { attendance: AttendanceTypes; message: string },
  void,
  { rejectValue: string }
>("attendance/check-out", async (_, { rejectWithValue }) => {
  try {
    const res = await checkOutApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant Check-out");
  }
});

//today attendance
export const getTodayAttendaceThunk = createAsyncThunk<
  AttendanceTypes,
  string | undefined,
  { rejectValue: string }
>("attendance/today", async (employeeId, { rejectWithValue }) => {
  try {
    const res = await getTodayAttendaceApi(employeeId);
    return res.data.attendance;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant get today attendance"
    );
  }
});

//get employee attendance
export const getEmployeeAttendanceThunk = createAsyncThunk<
  {
    attendance: AttendanceTypes[];
    summary: SummaryTypes;
    lastFetchedDate: string | null;
    hasMore: boolean;
  },
  {
    employeeId?: string | undefined;
    lastFetchedDate?: string | null;
    limit?: number;
    filter?: string;
    start?: string;
    end?: string;
  },
  { rejectValue: string }
>(
  "attendance/employee-all",
  async (
    { employeeId, lastFetchedDate, limit, filter, start, end },
    { rejectWithValue }
  ) => {
    try {
      const res = await getEmployeeAttendanceApi(
        employeeId,
        lastFetchedDate ?? undefined,
        limit,
        filter,
        start,
        end
      );
      console.log(res.data, "dataaaaa");
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Can't get attendance"
      );
    }
  }
);

// get this week attendance
export const getThisWeekAttendanceThunk = createAsyncThunk<
  SummaryTypes,
  void,
  { rejectValue: string }
>("attendance/thisWeek", async (_, { rejectWithValue }) => {
  try {
    const res = await getThisWeekAttendanceApi();
    return res.data.summary;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant get this week attendance"
    );
  }
});

export const getTodayAttendanceAllEmployeesThunk = createAsyncThunk<
  {
    attendance: AllEmployeeAttendance[];
    summary: SummaryTypes;
    pagination: { page: number; totalPages: number };
  },
  { limit: number; search?: string; page: number },
  { rejectValue: string }
>(
  "attendance/allemployeees",
  async ({ limit, search, page }, { rejectWithValue }) => {
    try {
      const res = await getTodayAttendanceAllEmployeesApi(limit, page, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Cant get today attendance"
      );
    }
  }
);

//edit attendance
export const editAttendanceDetailsThunk = createAsyncThunk<
  { edited: AttendanceTypes; message: string },
  {
    attendanceId: string;
    details: {
      checkIn: string | null;
      checkOut: string | null;
      status: string;
    };
  },
  { rejectValue: string }
>("attendance/edit", async ({ attendanceId, details }, { rejectWithValue }) => {
  try {
    const res = await editAttendanceDetailsApi(attendanceId, details);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant edit attendance details"
    );
  }
});

// apply for leave
export const applyLeaveThunk = createAsyncThunk<
  { leaveData: LeaveTypes; message: string },
  LeaveTypes,
  { rejectValue: string }
>("leave/apply", async (details, { rejectWithValue }) => {
  try {
    const res = await applyLeaveApi(details);
    console.log(res.data, "hahahahahahahah");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant apply for leave"
    );
  }
});

//get employee leave requests
export const getEmployeeLeaveRequestsThunk = createAsyncThunk<
  EmployeeLeaveRequestResponse,
  EmployeeLeaveRequestRequests,
  { rejectValue: string }
>(
  "leave/employee-all",
  async (
    { employeeId, page, limit, status, sort, search },
    { rejectWithValue }
  ) => {
    try {
      const res = await getEmployeeLeaveRequestsApi(
        employeeId,
        sort,
        status,
        page,
        limit,
        search
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Can't get leave requests"
      );
    }
  }
);

//get all requests
export const getAllLeaveRequestsThunk = createAsyncThunk<
  AllLeaveRequestResponse,
  AllLeaveRequestRequests,
  { rejectValue: string }
>(
  "leave/allRequests",
  async (
    { employeeId, page, limit, status, sort, search },
    { rejectWithValue }
  ) => {
    try {
      const res = await getAllLeaveRequestsApi(
        employeeId,
        sort,
        status,
        page,
        limit,
        search
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Can't get leave requests "
      );
    }
  }
);

//get single leave requests
export const getSingleLeaveRequestThunk = createAsyncThunk<
  LeaveTypes,
  string,
  { rejectValue: string }
>("leave/single-request", async (requestId, { rejectWithValue }) => {
  try {
    const res = await getSingleLeaveRequestApi(requestId);
    return res.data.leaveRequest;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Can't get leave request "
    );
  }
});

// update request status
export const updateLeaveRequestStatusThunk = createAsyncThunk<
  { leaveRequest: LeaveTypes; message: string },
  { requestId: string; data: { status: string; rejectReason?: string } },
  { rejectValue: string }
>("leave/update-status", async ({ requestId, data }, { rejectWithValue }) => {
  try {
    const res = await updateLeaveRequestStatusApi(requestId, data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Can't update leave request status"
    );
  }
});

// get last five attendance details
// update request status
export const getLastFiveDaysAttendanceSummaryThunk = createAsyncThunk<
  { details: LastFiveDaysSummary[] },
  void,
  { rejectValue: string }
>("attendance/last-five", async (_, { rejectWithValue }) => {
  try {
    const res = await getLastFiveDaysAttendanceSummaryApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message ||
        "Can't fetch last five days attendance details"
    );
  }
});
