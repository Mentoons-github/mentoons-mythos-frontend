import { createSlice } from "@reduxjs/toolkit";
import {
  assessmentFetchThunk,
  assessmentQuestionThunk,
  assessmentSubmitTunk,
  fetchAllSubmissionThunk,
  fetchSingleSubmissionThunk,
} from "./assessmentThunk";
import { AllSubmissions, Assessment, FetchAssessment, singleSubmission } from "../../types/redux/assessmentInterface";

interface AssessmentSlice {
  data: Assessment | null;
  loading: boolean;
  error: null | string | undefined;
  message: string;
  success: boolean;
  assessmentQusetion:null | FetchAssessment
  allSubmissions:AllSubmissions[]
  singleSubmission:singleSubmission []
  singleSubmissionLoading: boolean
}

const initialState: AssessmentSlice = {
  data: null as Assessment | null,
  loading: false,
  error: null,
  message: "",
  success: false,
  assessmentQusetion:null as FetchAssessment | null,
  allSubmissions: [],
  singleSubmission:[],
  singleSubmissionLoading:false
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
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      //submit assessment
      .addCase(assessmentSubmitTunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assessmentSubmitTunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.assessment;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(assessmentSubmitTunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //create questions
      .addCase(assessmentQuestionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assessmentQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(assessmentQuestionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //fetch assessment
      .addCase(assessmentFetchThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assessmentFetchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.assessmentQusetion = action.payload;
        // state.success = true;
      })
      .addCase(assessmentFetchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //fetch all submissiions
      .addCase(fetchAllSubmissionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubmissionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allSubmissions = action.payload;
      })
      .addCase(fetchAllSubmissionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //fetch single submission
      .addCase(fetchSingleSubmissionThunk.pending, (state) => {
        state.singleSubmissionLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleSubmissionThunk.fulfilled, (state, action) => {
        state.singleSubmissionLoading = false;
        state.error = null;
        state.singleSubmission = action.payload;
      })
      .addCase(fetchSingleSubmissionThunk.rejected, (state, action) => {
        state.singleSubmissionLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default assessmentSlice.reducer;
export const { resetAssessmentSlice } = assessmentSlice.actions;
