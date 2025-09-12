import { createSlice } from "@reduxjs/toolkit";
import {
  deleteReportsThunk,
  getReportsThunk,
  getSingleReportThunk,
} from "./report_blockThunk";
import { Report } from "../../types/redux/report";

interface RepBlo {
  reports: Report[];
  reportsLoading: boolean;
  success: boolean;
  error: null | undefined | string;
  reportTotalPage: number;
  reportPage: number;
  reportTotal: number;
  singleLoading: boolean;
  singleReport: Report | null;
  deleteLoading: boolean;
  deleteMessage: string;
  deleteSuccess: boolean;
}

const initialState: RepBlo = {
  reports: [],
  reportsLoading: false,
  success: false,
  error: null,
  reportPage: 0,
  reportTotal: 0,
  reportTotalPage: 0,
  singleLoading: false,
  singleReport: null,
  deleteLoading: false,
  deleteMessage: "",
  deleteSuccess: false,
};

const report_blockSlice = createSlice({
  name: "report_block",
  initialState,
  reducers: {
    resetReportBlockSlice: (state) => {
      state.error = null;
      state.reportsLoading = false;
      state.success = false;
      state.deleteLoading = false;
      state.deleteMessage = "";
      state.singleLoading = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportsThunk.pending, (state) => {
        state.reportsLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getReportsThunk.fulfilled, (state, action) => {
        state.reportsLoading = false;
        state.error = null;
        state.reports = action.payload.reports;
        state.success = true;
        state.reportTotal = action.payload.total;
        state.reportPage = action.payload.page;
        state.reportTotalPage = action.payload.totalPage;
      })
      .addCase(getReportsThunk.rejected, (state, action) => {
        state.reportsLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      //single report
      .addCase(getSingleReportThunk.pending, (state) => {
        state.singleLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getSingleReportThunk.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.error = null;
        state.singleReport = action.payload;
        state.success = true;
      })
      .addCase(getSingleReportThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      //delete reports
      .addCase(deleteReportsThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteReportsThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.deleteMessage = action.payload;
        state.deleteSuccess = true;
        if (action.meta.arg) {
          state.reports = state.reports.filter(
            (job) => job._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteReportsThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      });
  },
});

export default report_blockSlice.reducer;
export const { resetReportBlockSlice } = report_blockSlice.actions;
