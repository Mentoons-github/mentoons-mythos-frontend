import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  blockUserApi,
  fetchAllUsersApi,
  fetchSingleUserApi,
  fetchUserCountApi,
  fetchUserDetails,
  logout,
  reportUserApi,
  updateUser,
} from "./api/userApi";
import {
  AllUserResponse,
  IUser,
  UserResponse,
} from "../../types/user/userInterface";
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

export const fetchAllUserThunk = createAsyncThunk<
  AllUserResponse,
  { page: number; limit: number; search?: string; sort?: string, filterBy?:string, filterValue?:string }
>(
  "user/fetch-allusers",
  async ({ page, limit, sort, search, filterBy, filterValue }, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsersApi(page, limit, sort, search, filterBy, filterValue);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Fetching all users failed"
      );
    }
  }
);

//feth all user count
export const fetchAllUserCountThunk = createAsyncThunk<
  number,
  void
>(
  "user/fetchuser-count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserCountApi();
      return response.data.count;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Fetching all users failed"
      );
    }
  }
);

export const blockUserThunk = createAsyncThunk<
  { message: string; user: IUser; success: boolean },
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

export const updateUserData = createAsyncThunk<IUser, { user: Partial<IUser> }>(
  "user/add",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await updateUser(user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "failed update user"
      );
    }
  }
);

export const fetchSingleUserThunk = createAsyncThunk<UserResponse, string>(
  "user/fetch-singleuser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchSingleUserApi(userId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "User profile fetch failed"
      );
    }
  }
);
