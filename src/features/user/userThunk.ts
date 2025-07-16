import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchUserDetails, logout } from "./api/userApi";
import { UserResponse } from "../../types/user/userInterface";

export const fetchUserData = createAsyncThunk<UserResponse, void>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetails();
      console.log("response :", response.data);
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
