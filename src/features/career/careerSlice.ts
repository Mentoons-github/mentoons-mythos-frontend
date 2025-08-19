import { createSlice } from "@reduxjs/toolkit";
import { applyCareerThunk } from "./careerThunk";

interface sliceCareer {
  loading: boolean;
  error: null | undefined | string;
  message: string;
  success:boolean
}

const initialState: sliceCareer = {
  loading: false,
  error: null,
  message: "",
  success:false,
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {resetCareerSlice : (state)=> {
    state.loading = false
    state.error = null
    state.message = ''
    state.success = false
  }}, 
  extraReducers: (builder) => {
    builder
      .addCase(applyCareerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false
      })
      .addCase(applyCareerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true
      })
      .addCase(applyCareerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false
      });
  },
});

export default careerSlice.reducer;
export const {resetCareerSlice} = careerSlice.actions
