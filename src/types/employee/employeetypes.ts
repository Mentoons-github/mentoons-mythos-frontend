export interface EmployeeTypes {
  _id?: string;
  name: string;
  email: string;
  employeeID?: string;
  password?: string;
  assignedBy?: string;
  designation: string;
  jobType: string;
  department: string;
  gender: string;
  role?: "employee";
  createdAt?: string;
  salary?: number;
  profileImage?: string;
}

export interface GetEmployeeResponse {
  employees: EmployeeTypes[];
  page: number;
  totalPages: number;
}

export interface GetTaskResponse {
  tasks: EmployeeTasksTypes[];
  page: number;
  totalPages: number;
}

type TaskStatus =
  | "Completed"
  | "Completed Late"
  | "In Progress"
  | "Overdue"
  | "Extension Requested"
  | "Removed"
  | "Pending";

export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";

export interface EmployeeTasksTypes {
  _id?: string;
  title: string;
  description: string;
  assignedTo: string;
  priority?: TaskPriority;
  startDate: string;
  dueDate: string;
  status?: TaskStatus | string;
  attachments: string[];
  createdAt?: string;
  employee?: EmployeeTypes;
  submission?: TaskSubmitTypes;
  extensionRequest?: ExtensionRequestTypes;
}

export interface TaskSubmitTypes {
  taskId?: string;
  details: string;
  attachedFiles: { url: string; originalName: string }[];
}

export interface ExtensionRequestTypes {
  requestedDate: string;
  reason: string;
  status?: string;
  requestedAt?: string;
}

export interface EmployeeJobDistribution {
  fullTime: number;
  freelance: number;
  intern: number;
}

export interface TaskStatusSummaryType {
  status: string;
  count: number;
}

export interface TaskStatusSummaryTypeEmployee {
  summary: TaskStatusSummaryType[];
  totalCount: number;
  activeTasks: EmployeeTasksTypes[];
}

export interface EmployeePerformanceTypes {
  FinalPercentage: number;
  FinalRating: number;
  PerformanceLabel: string;
  TaskScore: number;
  AttendanceScore: number;
  TaskPercentage: number;
  AttendancePercentage: number;
  TotalTasks: number;
  stats: {
    Completed: number;
    CompletedLate: number;
    Pending: number;
    InProgress: number;
    Overdue: number;
    Removed: number;
  };
  attendance: {
    presentDays: number;
    halfDays: number;
    absentDays: number;
  };
  maxScore: number;
}
