import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  assessmentFetchApi,
  assessmentQuestionApi,
  assessmentSubmitApi,
  deleteAssessmentSubmissionApi,
  deleteInitialAssessmentSubmissionApi,
  fetchAllSubmissionApi,
  fetchInitialQuestionsApi,
  fetchSingleSubmissionApi,
  getInitialAssessmentSubmissionsApi,
  getSingleInitialAssessmentDetailsApi,
  initialAssessmentSubmitApi,
} from "./assessmentApi";
import {
  AllSubmissions,
  Assessment,
  AssessmentQuestion,
  FetchAssessment,
  InitialAssessmentDetails,
  InitialAssessmentSubmission,
  singleSubmission,
} from "../../types/redux/assessmentInterface";
import { AxiosError } from "axios";

//assessment submit
export const assessmentSubmitTunk = createAsyncThunk<
  { message: string; assessment: Assessment },
  Assessment,
  { rejectValue: string }
>("assessment/submit", async (details, { rejectWithValue }) => {
  try {
    const res = await assessmentSubmitApi(details);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment submission failed"
    );
  }
});

//assessment question
export const assessmentQuestionThunk = createAsyncThunk<
  string,
  AssessmentQuestion,
  { rejectValue: string }
>("assessment/question", async (data, { rejectWithValue }) => {
  try {
    const res = await assessmentQuestionApi(data);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment question create failed"
    );
  }
});

//fetch question
export const assessmentFetchThunk = createAsyncThunk<
  FetchAssessment,
  string,
  { rejectValue: string }
>("assessment/fetch", async (name, { rejectWithValue }) => {
  try {
    const res = await assessmentFetchApi(name);
    return res.data.assessement;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment Fetch failed"
    );
  }
});

//fetchAll submissions
export const fetchAllSubmissionThunk = createAsyncThunk<
  { details: AllSubmissions[]; page: number; totalPages: number },
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>(
  "assessment/fetchAllSubmissions",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await fetchAllSubmissionApi(page, limit, sort, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Assessment Fetch failed"
      );
    }
  }
);

//fetch single submission
export const fetchSingleSubmissionThunk = createAsyncThunk<
  singleSubmission[],
  string,
  { rejectValue: string }
>(
  "assessment/fetchSingleSubmission",
  async (submissionId, { rejectWithValue }) => {
    try {
      const res = await fetchSingleSubmissionApi(submissionId);
      return res.data.details;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Assessment Fetch failed"
      );
    }
  }
);

//initial question
export const fetchInitialQuestionsThunk = createAsyncThunk<
  AssessmentQuestion[],
  void,
  { rejectValue: string }
>("assessment/initial", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchInitialQuestionsApi();
    return res.data.questions;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment question create failed"
    );
  }
});

//initial assessment submit
export const initialAssessmentSubmitThunk = createAsyncThunk<
  { message: string; assessment: Assessment },
  { details: InitialAssessmentSubmission; userId: string },
  { rejectValue: string }
>(
  "assessment/initial-submit",
  async ({ details, userId }, { rejectWithValue }) => {
    try {
      const res = await initialAssessmentSubmitApi(details, userId);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Assessment submission failed"
      );
    }
  }
);

// get initial assessment details
export const getInitialAssessmentSubmissionsThunk = createAsyncThunk<
  { details: InitialAssessmentDetails[]; page: number; totalPages: number },
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>(
  "assessment/initial-getall",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await getInitialAssessmentSubmissionsApi(
        page,
        limit,
        sort,
        search
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message ||
          "Cant fetch initial assessment details"
      );
    }
  }
);

// get single initial assessment submissions
export const getSingleInitialAssessmentSubmissionsThunk = createAsyncThunk<
  InitialAssessmentDetails,
  string,
  { rejectValue: string }
>("assessment/initial-getsingle", async (assessmentId, { rejectWithValue }) => {
  try {
    const res = await getSingleInitialAssessmentDetailsApi(assessmentId);
    return res.data.details;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant fetch initial assessment details"
    );
  }
});

// delete submitted assessment
export const deleteAssessmentSubmissionThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("assessment/delete", async (assessmentId, { rejectWithValue }) => {
  try {
    const res = await deleteAssessmentSubmissionApi(assessmentId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant delete assessment details"
    );
  }
});

// delete initial submitted assessment
export const deleteInitialAssessmentSubmissionThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("assessment/initial-delete", async (assessmentId, { rejectWithValue }) => {
  try {
    const res = await deleteInitialAssessmentSubmissionApi(assessmentId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant delete initial assessment details"
    );
  }
});
