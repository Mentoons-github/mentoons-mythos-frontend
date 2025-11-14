import { IUser } from "../user/userInterface";

export interface Report {
  _id?: string;
  from: string;
  fromId?: string;
  userId: IUser;
  reportedBy: IUser;
  reason: string;
  createdAt: string;
}

export interface GetReportResponse {
  reports: Report[];
  total: number;
  page: number;
  totalPage: number;
}

