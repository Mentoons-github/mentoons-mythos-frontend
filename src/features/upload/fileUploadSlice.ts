import { createSlice } from "@reduxjs/toolkit";
import { fileUploadThunk } from "./fileUploadThunk";

type FileUploadState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  file: string | null | [{ url: string; originalName: string }];
};

const initialState: FileUploadState = {
  loading: false,
  error: null,
  success: false,
  file: null,
};

export const fileUploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fileUploadThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fileUploadThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      console.log(action.payload, "action.payload");
      state.file = action.payload;
    });
    builder.addCase(fileUploadThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Something went wrong!";
    });
  },
});

export default fileUploadSlice.reducer;
