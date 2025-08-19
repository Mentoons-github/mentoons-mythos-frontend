import { createAsyncThunk } from "@reduxjs/toolkit";
import { appyCareerApi } from "./careerApi";
import { AxiosError } from "axios";
import { Career } from "../../types/redux/careerInterface";

export const applyCareerThunk = createAsyncThunk<
  string,
  Career,
  { rejectValue: string }
>("career/apply", async (data, { rejectWithValue }) => {
  try {
    const res = await appyCareerApi(data);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of apply"
    );
  }
});
