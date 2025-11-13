import apiClient from "../../services/axiosInstance";
import { LeaveTypes } from "../../types/employee/attendance&leaveTypes";

//check in
export const checkInApi = () => {
  return apiClient.post("/employee/attendance/check-in");
};

//check out
export const checkOutApi = () => {
  return apiClient.patch("/employee/attendance/check-out");
};

//today attendance
export const getTodayAttendaceApi = (employeeId?: string) => {
  const url = employeeId
    ? `/admin/employee/attendance/today/${employeeId}`
    : `/employee/attendance/today`;
  return apiClient.get(url);
};

//get employee attendance
export const getEmployeeAttendanceApi = (
  employeeId?: string,
  lastFetchedDate?: string,
  limit: number = 50,
  filter?: string,
  start?: string,
  end?: string
) => {
  const params = new URLSearchParams();
  if (lastFetchedDate) params.append("lastFetchedDate", lastFetchedDate);
  params.append("limit", limit.toString());
  if (filter) params.append("filter", filter);
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const url = employeeId
    ? `/admin/employee/attendance/${employeeId}?${params.toString()}`
    : `/employee/attendance?${params.toString()}`;

  return apiClient.get(url);
};

//get this week attendance
export const getThisWeekAttendanceApi = () => {
  return apiClient.get(`/employee/attendance?limit=5&filter=thisWeek`);
};

//get today all employee attendance
export const getTodayAttendanceAllEmployeesApi = (
  limit: number,
  page: number,
  search?: string
) => {
  return apiClient.get(
    `/admin/employee/attendance?page=${page}&limit=${limit}&search=${search}`
  );
};

// edit attendance
export const editAttendanceDetailsApi = (
  attendanceId: string,
  details: { checkIn: string | null; checkOut: string | null; status: string }
) => {
  return apiClient.put(
    `/admin/employee/attendance/edit/${attendanceId}`,
    details
  );
};

// apply for leave
export const applyLeaveApi = (details: LeaveTypes) => {
  return apiClient.post("/employee/leave/apply", details);
};

// get employee leave requests
export const getEmployeeLeaveRequestsApi = (
  employeeId?: string,
  sort?: string,
  status?: string,
  page?: number,
  limit?: number,
  search?: string
) => {
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  const url = employeeId ? "" : `/employee/leave/requests?${params.toString()}`;

  return apiClient.get(url);
};

// get all leave requests
export const getAllLeaveRequestsApi = (
  employeeId?: string,
  sort?: string,
  status?: string,
  page?: number,
  limit?: number,
  search?: string
) => {
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  const url = employeeId
    ? ""
    : `/admin/employee/leave/requests?${params.toString()}`;
  return apiClient.get(url);
};

// get single leave request
export const getSingleLeaveRequestApi = (requestId: string) => {
  return apiClient.get(`/employee/leave/request/${requestId}`);
};

// update leave requests status
export const updateLeaveRequestStatusApi = (
  requestId: string,
  data: { status: string; rejectReason?: string }
) => {
  return apiClient.put(
    `/admin/employee/leave/update-status/${requestId}`,
    data
  );
};


//get last five days request
export const getLastFiveDaysAttendanceSummaryApi = () => {
  return apiClient.get("/admin/employee/attendance/get/lastfive")
}