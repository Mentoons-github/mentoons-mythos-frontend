import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  allBlockedDeatailsApi,
  blockUserFromBlogApi,
  deleteReportApi,
  getReportsApi,
  getSingleReportApi,
  takeReportActionApi,
} from "./report_blockApi";
import { AxiosError } from "axios";
import { BlockType, GetReportResponse, Report } from "../../types/redux/report";

export const getReportsThunk = createAsyncThunk<
  GetReportResponse,
  {
    page: number;
    limit: number;
    sort: string;
    search?: string;
    filter?: string;
  },
  { rejectValue: string }
>(
  "Report/get",
  async ({ page, limit, sort, filter, search }, { rejectWithValue }) => {
    try {
      const res = await getReportsApi(page, limit, sort, filter, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong",
      );
    }
  },
);

//get single report details
export const getSingleReportThunk = createAsyncThunk<
  Report,
  string,
  { rejectValue: string }
>("Report/getsingle", async (reportId, { rejectWithValue }) => {
  try {
    const res = await getSingleReportApi(reportId);
    return res.data.report;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetch report",
    );
  }
});

//delete reports
export const deleteReportsThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("Report/delete", async (reportId, { rejectWithValue }) => {
  try {
    const res = await deleteReportApi(reportId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of deleting report",
    );
  }
});

// take report action
export const takeReportActionThunk = createAsyncThunk<
  string,
  { reportId: string; action: string },
  { rejectValue: string }
>("Report/action", async ({ reportId, action }, { rejectWithValue }) => {
  try {
    const res = await takeReportActionApi(reportId, action);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of take action report",
    );
  }
});

// block user
export const blockUserFromBlogThunk = createAsyncThunk<
  string,
  { blockedUser: string; reason: string },
  { rejectValue: string }
>("block", async ({ blockedUser, reason }, { rejectWithValue }) => {
  try {
    const res = await blockUserFromBlogApi(blockedUser, reason);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of block",
    );
  }
});

//all blocked data
export const allBlockedDeatailsThunk = createAsyncThunk<
  BlockType[],
  void,
  { rejectValue: string }
>("block/all", async (_, { rejectWithValue }) => {
  try {
    const res = await allBlockedDeatailsApi();
    return res.data.blockedData;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of block fetch",
    );
  }
});
