import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordApi, loginApi, registerApi, sendOtpApi, verifyOtpApi } from "./authApi";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "../../types/redux/authInterfaces";
import { AxiosError } from "axios";

export const registerThunk = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await registerApi(userData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
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
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Login Failed");
  }
});

export const sendOtpThunk = createAsyncThunk<
  SendOtpResponse,
  SendOtpPayload,
  { rejectValue: string }
>("auth/send-otp", async (email, { rejectWithValue }) => {
  try {
    const res = await sendOtpApi(email);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant Send OTP, Try again"
    );
  }
});

export const verifyOtpThunk = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verify-otp", async (data, { rejectWithValue }) => {
  try {
    const res = await verifyOtpApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant verify this OTP"
    );
  }
});

export const forgotPasswordThunk = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgot-password", async (userData, { rejectWithValue }) => {
  try {
    const res = await forgotPasswordApi(userData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Forgot Password Failed");
  }
});
