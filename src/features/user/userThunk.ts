import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  blockUserApi,
  fetchAllUsersApi,
  fetchUserDetails,
  logout,
  reportUserApi,
} from "./api/userApi";
import { AllUserResponse, IUser, UserResponse } from "../../types/user/userInterface";
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

export const fetchAllUserThunk = createAsyncThunk<AllUserResponse, void>(
  "user/fetch-allusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsersApi();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Fetching all users failed"
      );
    }
  }
);

export const blockUserThunk = createAsyncThunk<
  { message: string, user:IUser, success:boolean },
  string,
  { rejectValue: string }
>("user/block-user", async (userId, { rejectWithValue }) => {
  try {
    const response = await blockUserApi(userId);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "User profile fetch failed"
    );
  }
});

export const userLogout = createAsyncThunk<void, void, { rejectValue: string }>(
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
>("user/report", async ({ data, userId }, { rejectWithValue }) => {
  try {
    const response = await reportUserApi(data, userId);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Report failed");
  }
});
