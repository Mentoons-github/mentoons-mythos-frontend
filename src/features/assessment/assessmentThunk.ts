import { createAsyncThunk } from "@reduxjs/toolkit";
import { assessmentSubmitApi } from "./assessmentApi";
import { Assessment } from "../../types/redux/assessmentInterface";
import { AxiosError } from "axios";

export const assessmentSubmitTunk = createAsyncThunk<
  {message:string,assessment:Assessment},
  Assessment,
  { rejectValue: string }
>("assessment/submit", async (details, { rejectWithValue }) => {
  try {
    const res = await assessmentSubmitApi(details);
    return res.data
  } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Assessment submission failed"
      );
    }
});
