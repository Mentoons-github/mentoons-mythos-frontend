import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fileUploadApi } from "./fileUplaodApi";

export const fileUploadThunk = createAsyncThunk<
  string | [{ url: string; originalName: string }],
  { file: File | File[]; category: string },
  { rejectValue: string }
>("upload/file", async ({ file, category }, { rejectWithValue }) => {
  try {
    const res = await fileUploadApi(file, category);
    const uploaded = res.data.uploaded;
    if (Array.isArray(file)) {
      return uploaded.map((f: []) => f);
    } else {
      return uploaded[0].url;
    }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "File upload failed"
    );
  }
});
