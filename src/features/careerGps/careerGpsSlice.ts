import { createSlice } from "@reduxjs/toolkit";
import { submitCareerGpsThunk } from "./careerGpsThunk";

interface sliceCareerGps {
  loading: boolean;
  error: null | undefined | string;
  message: string;
  success: boolean;
}

const initialState: sliceCareerGps = {
  loading: false,
  error: null,
  message: "",
  success: false,
};

const CareerGpsSlice = createSlice({
  name: "careerGps",
  initialState,
  reducers: {
    resetCareerGpsSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //submit career gps form
      .addCase(submitCareerGpsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitCareerGpsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(submitCareerGpsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default CareerGpsSlice.reducer;
export const { resetCareerGpsSlice } = CareerGpsSlice.actions;
