import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { submitCareerGpsApi } from "./careerGpsApi";
import { CareerGPSTypes } from "../../types/redux/about&newsletter";

export const submitCareerGpsThunk = createAsyncThunk<
  string,
  CareerGPSTypes,
  { rejectValue: string }
>("career-gps/submit", async (form, { rejectWithValue }) => {
  try {
    const res = await submitCareerGpsApi(form);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of submit details"
    );
  }
});
