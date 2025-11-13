import { createSlice } from "@reduxjs/toolkit";
import {
  assessmentFetchThunk,
  assessmentQuestionThunk,
  assessmentSubmitTunk,
  deleteAssessmentSubmissionThunk,
  deleteInitialAssessmentSubmissionThunk,
  fetchAllSubmissionThunk,
  fetchInitialQuestionsThunk,
  fetchSingleSubmissionThunk,
  getInitialAssessmentSubmissionsThunk,
  getSingleInitialAssessmentSubmissionsThunk,
  initialAssessmentSubmitThunk,
} from "./assessmentThunk";
import {
  AllSubmissions,
  Assessment,
  AssessmentQuestion,
  FetchAssessment,
  InitialAssessmentDetails,
  singleSubmission,
} from "../../types/redux/assessmentInterface";

interface AssessmentSlice {
  data: Assessment | null;
  loading: boolean;
  error: null | string | undefined;
  message: string;
  success: boolean;
  assessmentQusetion: null | FetchAssessment;
  allSubmissions: AllSubmissions[];
  singleSubmission: singleSubmission[];
  singleSubmissionLoading: boolean;
  initialQuestions: AssessmentQuestion[];
  initialSubmissions: InitialAssessmentDetails[];
  initialPage: number;
  initialTotalPages: number;
  singleInitialDetails: InitialAssessmentDetails | null;
  singleInitialLoading: boolean;
  submissionPage: number;
  submissionTotalPages: number;
  deleteSuccess: boolean;
  deleteLoading: boolean;
}

const initialState: AssessmentSlice = {
  data: null as Assessment | null,
  loading: false,
  error: null,
  message: "",
  success: false,
  assessmentQusetion: null as FetchAssessment | null,
  allSubmissions: [],
  singleSubmission: [],
  singleSubmissionLoading: false,
  initialQuestions: [],
  initialPage: 0,
  initialSubmissions: [],
  initialTotalPages: 0,
  singleInitialDetails: null,
  singleInitialLoading: false,
  submissionPage: 0,
  submissionTotalPages: 0,
  deleteLoading: false,
  deleteSuccess: false,
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
      state.deleteLoading = false;
      state.deleteSuccess = false
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
        state.allSubmissions = action.payload.details;
        state.submissionPage = action.payload.page;
        state.submissionTotalPages = action.payload.totalPages;
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
      })

      //get initial assessment questions
      .addCase(fetchInitialQuestionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.initialQuestions = action.payload;
        // state.success = true;
      })
      .addCase(fetchInitialQuestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //submit initial assessment
      .addCase(initialAssessmentSubmitThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initialAssessmentSubmitThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(initialAssessmentSubmitThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // get initial assessment details
      .addCase(getInitialAssessmentSubmissionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getInitialAssessmentSubmissionsThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.initialSubmissions = action.payload.details;
          state.initialPage = action.payload.page;
          state.initialTotalPages = action.payload.totalPages;
        }
      )
      .addCase(
        getInitialAssessmentSubmissionsThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // get single initial assessment details
      .addCase(getSingleInitialAssessmentSubmissionsThunk.pending, (state) => {
        state.singleInitialLoading = true;
        state.error = null;
      })
      .addCase(
        getSingleInitialAssessmentSubmissionsThunk.fulfilled,
        (state, action) => {
          state.singleInitialLoading = false;
          state.error = null;
          state.singleInitialDetails = action.payload;
        }
      )
      .addCase(
        getSingleInitialAssessmentSubmissionsThunk.rejected,
        (state, action) => {
          state.singleInitialLoading = false;
          state.error = action.payload as string;
        }
      )

      //delete assessment
      .addCase(deleteAssessmentSubmissionThunk.pending, (state) => {
        state.error = null;
        state.deleteSuccess = false;
        state.deleteLoading = true;
      })
      .addCase(deleteAssessmentSubmissionThunk.fulfilled, (state, action) => {
        state.error = null;
        state.deleteSuccess = true;
        state.message = action.payload;
        state.deleteLoading = false;
        if (action.meta.arg) {
          state.allSubmissions = state.allSubmissions.filter(
            (assessment) => assessment._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteAssessmentSubmissionThunk.rejected, (state, action) => {
        state.deleteSuccess = false;
        state.error = action.payload as string;
        state.deleteLoading = false;
      })

      //delete initial assessment
      .addCase(deleteInitialAssessmentSubmissionThunk.pending, (state) => {
        state.error = null;
        state.deleteSuccess = false;
        state.deleteLoading = true;
      })
      .addCase(
        deleteInitialAssessmentSubmissionThunk.fulfilled,
        (state, action) => {
          state.error = null;
          state.deleteSuccess = true;
          state.message = action.payload;
          state.deleteLoading = false;
          if (action.meta.arg) {
            state.initialSubmissions = state.initialSubmissions.filter(
              (assessment) => assessment._id !== action.meta.arg
            );
          }
        }
      )
      .addCase(
        deleteInitialAssessmentSubmissionThunk.rejected,
        (state, action) => {
          state.deleteSuccess = false;
          state.error = action.payload as string;
          state.deleteLoading = false;
        }
      );
  },
});

export default assessmentSlice.reducer;
export const { resetAssessmentSlice } = assessmentSlice.actions;
