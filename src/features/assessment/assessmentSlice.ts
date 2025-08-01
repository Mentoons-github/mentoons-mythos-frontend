import { createSlice } from "@reduxjs/toolkit";
import { assessmentSubmitTunk } from "./assessmentThunk";
import { Assessment } from "../../types/redux/assessmentInterface";

interface AssessmentSlice {
  data: Assessment | null;
  loading: boolean;
  error: null | string | undefined;
  message: string;
  success:boolean
}

const initialState: AssessmentSlice = {
  data: null as Assessment | null,
  loading: false,
  error: null,
  message: "",
  success:false
};

const assessmentSlice = createSlice({
  name: "assessement",
  initialState,
  reducers: {
    resetAssessmentSlice: (state) => {
      state.data = null;
      state.error = null;
      state.message = "";
      state.loading = false;
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assessmentSubmitTunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assessmentSubmitTunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.assessment;
        state.message = action.payload.message;
        state.success = true
      })
      .addCase(assessmentSubmitTunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false
      });
  },
});

export default assessmentSlice.reducer;
export const {resetAssessmentSlice} = assessmentSlice.actions
