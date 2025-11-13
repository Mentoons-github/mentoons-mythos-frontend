import { createSlice } from "@reduxjs/toolkit";

import { submitMentorFormThunk } from "./mentorThunk";

interface sliceMentor {
  loading: boolean;
  error: null | undefined | string;
  message: string;
  success: boolean;
}

const initialState: sliceMentor = {
  loading: false,
  error: null,
  message: "",
  success: false,
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {
    resetMentorSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //submit mentor form
      .addCase(submitMentorFormThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitMentorFormThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(submitMentorFormThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default mentorSlice.reducer;
export const { resetMentorSlice } = mentorSlice.actions;
