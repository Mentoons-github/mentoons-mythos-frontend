import { IUser } from "../user/userInterface";

export interface Report {
  _id?: string;
  targetType: string;
  targetId?: string;
  reportedUser: IUser;
  reportedBy: IUser;
  reason: string;
  status?: "pending" | "reviewed" | "resolved" | "rejected";
  actionTaken?: "none" | "deleted" | "hidden" | "warning_sent" | "user_banned";
  createdAt: string;
}

export interface GetReportResponse {
  reports: Report[];
  total: number;
  page: number;
  totalPage: number;
}

export interface BlockType {
  _id: string;
  blockedUser: IUser;
  blockedBy: IUser;
  reason: string;
}
