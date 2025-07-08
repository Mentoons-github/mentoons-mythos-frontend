import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authApi";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../../types/redux/authInterfaces";

export const registerThunk = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await registerApi(userData);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const res = await loginApi(userData);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Login Failed");
  }
});
