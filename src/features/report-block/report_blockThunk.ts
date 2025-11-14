import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteReportApi,
  getReportsApi,
  getSingleReportApi,
} from "./report_blockApi";
import { AxiosError } from "axios";
import { GetReportResponse, Report } from "../../types/redux/report";

export const getReportsThunk = createAsyncThunk<
  GetReportResponse,
  { page: number; limit: number; sort: string; search?:string; filter?: string },
  { rejectValue: string }
>("Report/get", async ({ page, limit, sort, filter, search }, { rejectWithValue }) => {
  try {
    const res = await getReportsApi(page, limit, sort, filter, search);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something went wrong"
    );
  }
});

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
      error?.response?.data?.message || "Something error of deleting job"
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
      error?.response?.data?.message || "Something error of deleting job"
    );
  }
});
