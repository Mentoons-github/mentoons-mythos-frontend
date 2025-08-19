import apiClient from "../../services/axiosInstance";
import {
  ChangePassword,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  SendOtpPayload,
  VerifyOtpPayload,
} from "../../types/redux/authInterfaces";

export const registerApi = (userData: RegisterPayload) => {
  return apiClient.post("/auth/register", userData);
};

export const loginApi = (userData: LoginPayload) => {
  return apiClient.post("/auth/login", userData);
};

export const sendOtpApi = (email: SendOtpPayload) => {
  return apiClient.post("/auth/send-otp", email);
};

export const verifyOtpApi = (data: VerifyOtpPayload) => {
  return apiClient.post("/auth/verify-otp", data);
};

export const forgotPasswordApi = (data: ForgotPasswordPayload) => {
  return apiClient.post("auth/forgot-password", data);
};

export const changePassword = (data: ChangePassword) => {
  return apiClient.put("/auth/change-password", data);
};
