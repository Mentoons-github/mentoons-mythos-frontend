import { EmployeeTypes } from "./employeetypes";

export interface AttendanceTypes {
  _id?: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "On Leave" | "Half Day" | "Late";
  totalHours: number;
}

export interface SummaryTypes {
  totalEmployees?: number;
  totalDays: number;
  presentDays: number;
  lateDays: number;
  halfDays: number;
  absentDays: number;
  onLeaveDays: number;
  avgHours: number;
}

export interface AllEmployeeAttendance {
  _id?: string;
  employee: EmployeeTypes;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "On Leave" | "Half Day" | "Late";
  totalHours: number;
}

export interface LeaveTypes {
  _id?: string;
  createdAt?: string;
  employeeId?: string;
  employee?: EmployeeTypes;
  leaveType: "";
  fromDate: string;
  toDate: string;
  reason: string;
  status?: "Pending" | "Approved" | "Rejected";
  totalDays?: number;
  rejectReason?: string;
}

export interface EmployeeLeaveRequestResponse {
  leaveRequests: LeaveTypes[];
  page: number;
  totalPage: number;
}

export interface EmployeeLeaveRequestRequests {
  employeeId?: string | undefined;
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  search?: string;
}

export interface AllRequestCountStatus {
  Pending: number;
  Approved: number;
  Rejected: number;
}

export interface AllLeaveRequestResponse {
  leaveRequests: LeaveTypes[];
  page: number;
  totalPage: number;
  countByStatus: AllRequestCountStatus;
}

export interface AllLeaveRequestRequests {
  employeeId?: string | undefined;
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  search?: string;
}

export interface LastFiveDaysSummary {
  day: string;
  present: number;
  late: number;
  halfday: number;
  leave: number;
  absent: number;
}
