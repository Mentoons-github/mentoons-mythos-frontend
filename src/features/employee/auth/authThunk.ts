import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EmployeeLogin } from "../../../types/employee";
import { loginEmployee } from "./api";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: "user" | "employee";
  };
}

export const employeeLogin = createAsyncThunk<LoginResponse, EmployeeLogin>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginEmployee(credentials);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
