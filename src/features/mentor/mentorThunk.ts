import { createAsyncThunk } from "@reduxjs/toolkit";
import { MentorTypes } from "../../types/redux/careerInterface";
import { submitMentorFormApi } from "./mentorApi";
import { AxiosError } from "axios";

export const submitMentorFormThunk = createAsyncThunk<
  string,
  MentorTypes,
  { rejectValue: string }
>("mentor/submit", async (form, { rejectWithValue }) => {
  try {
    const res = await submitMentorFormApi(form);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of submit details"
    );
  }
});
