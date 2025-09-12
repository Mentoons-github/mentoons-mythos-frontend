import { createAsyncThunk } from "@reduxjs/toolkit";
import { assessmentFetchApi, assessmentQuestionApi, assessmentSubmitApi, fetchAllSubmissionApi, fetchSingleSubmissionApi } from "./assessmentApi";
import {
  AllSubmissions,
  Assessment,
  AssessmentQuestion,
  FetchAssessment,
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
  AllSubmissions[],
  void,
  { rejectValue: string }
>("assessment/fetchAllSubmissions", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchAllSubmissionApi();
    return res.data.assessments;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment Fetch failed"
    );
  }
});

//fetch single submission
export const fetchSingleSubmissionThunk = createAsyncThunk<
  singleSubmission[],
  string,
  { rejectValue: string }
>("assessment/fetchSingleSubmission", async (submissionId, { rejectWithValue }) => {
  try {
    const res = await fetchSingleSubmissionApi(submissionId);
    return res.data.details;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Assessment Fetch failed"
    );
  }
});
