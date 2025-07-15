import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fileUplaodApi } from "./fileUplaodApi";

export const fileUploadThunk = createAsyncThunk<
  string,
  { file: File; category: string },
  { rejectValue: string }
>("upload/file", async ({ file, category }, { rejectWithValue }) => {
  try {
    const res = await fileUplaodApi(file, category);
    console.log(typeof(res.data.uploaded[0].url), "rrrrressssssssssss");
    return res.data.uploaded[0].url;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});
