import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchUserDetails, logout, reportUserApi } from "./api/userApi";
import { UserResponse } from "../../types/user/userInterface";
import { ReportResponse } from "../../types/redux/reportInterface";

export const fetchUserData = createAsyncThunk<UserResponse, void>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetails();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "User profile fetch failed"
      );
    }
  }
);

export const userLogout = createAsyncThunk<void, void>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      rejectWithValue(error?.response?.data?.message || "Failed to logout");
    }
  }
);


export const reportUserThunk = createAsyncThunk<
  { message: string },
  { data: ReportResponse; userId: string },
  { rejectValue: string }
>(
  "user/report",
  async ({ data, userId }, { rejectWithValue }) => {
    try {
      const response = await reportUserApi(data, userId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error?.response?.data?.message || "Report failed");
    }
  }
);

