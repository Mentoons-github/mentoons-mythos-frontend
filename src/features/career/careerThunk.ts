import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewJobApi,
  appyCareerApi,
  deleteJobApi,
  deleteJobApplicationApi,
  deleteSelectedJobApplicationsApi,
  fetchJobApplicationCountApi,
  fetchJobCountApi,
  getAllApplicationsApi,
  getJobsApi,
  getSingleJobApi,
  getSingleJobApplicationApi,
  sendAssignementsApi,
  updateJobApi,
  updateStatusApi,
} from "./careerApi";
import { AxiosError } from "axios";
import {
  AssignementSend,
  Career,
  GetApplicationsParams,
  GetApplicationsResponse,
  GetJobResponse,
  IJobs,
} from "../../types/redux/careerInterface";

export const applyCareerThunk = createAsyncThunk<
  string,
  { data: Career; jobId: string },
  { rejectValue: string }
>("career/apply", async ({ data, jobId }, { rejectWithValue }) => {
  try {
    const res = await appyCareerApi(data, jobId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of apply"
    );
  }
});

//get jobs
export const getJobsThunk = createAsyncThunk<
  GetJobResponse,
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>("career/job", async ({ page, limit, sort, search }, { rejectWithValue }) => {
  try {
    const res = await getJobsApi(page, limit, sort, search);
    console.log(res.data,'ddddd')
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching jobs"
    );
  }
});

//fetch jobs count
export const fetchJobsCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("career/jobcount", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchJobCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching job count"
    );
  }
});

//get single job
export const getSingleJobThunk = createAsyncThunk<
  IJobs,
  string,
  { rejectValue: string }
>("career/singlejob", async (jobId, { rejectWithValue }) => {
  try {
    const res = await getSingleJobApi(jobId);
    return res.data.job;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching job"
    );
  }
});

//add new job
export const addNewJobThunk = createAsyncThunk<
  { message: string; newJob: IJobs },
  IJobs,
  { rejectValue: string }
>("career/addNewJob", async (job, { rejectWithValue }) => {
  try {
    const res = await addNewJobApi(job);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of adding new job"
    );
  }
});

//update job
export const updateJobThunk = createAsyncThunk<
  { message: string; updatedJob: IJobs },
  { updatedJob: IJobs; jobId: string },
  { rejectValue: string }
>("career/updatejob", async ({ updatedJob, jobId }, { rejectWithValue }) => {
  try {
    const res = await updateJobApi(updatedJob, jobId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of updating job"
    );
  }
});

//deleteJob
export const deleteJobThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("career/deletejob", async (jobId, { rejectWithValue }) => {
  try {
    const res = await deleteJobApi(jobId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of deleting job"
    );
  }
});

//get applicationns
export const getAllApplicationsThunk = createAsyncThunk<
  GetApplicationsResponse,
  GetApplicationsParams,
  { rejectValue: string }
>(
  "career/getapplications",
  async (
    { page, limit, genders, jobTitles, locations, status, sort, search },
    { rejectWithValue }
  ) => {
    try {
      const res = await getAllApplicationsApi(page, limit, sort, search, {
        genders,
        jobTitles,
        locations,
        status,
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Something error of apply"
      );
    }
  }
);

//fetch job application count
export const fetchJobApplicationCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("career/jobapplication-count", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchJobApplicationCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching job application count"
    );
  }
});

//deleteJob
export const deleteJobApplicationThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("career/deletejobapplication", async (jobId, { rejectWithValue }) => {
  try {
    const res = await deleteJobApplicationApi(jobId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of deleting job"
    );
  }
});

//delted selected applications
export const deleteSelectedJobApplicationsThunk = createAsyncThunk<
  string,
  { applicationIds: string[] },
  { rejectValue: string }
>(
  "career/deleteselectedjobapplication",
  async ({ applicationIds }, { rejectWithValue }) => {
    try {
      const res = await deleteSelectedJobApplicationsApi(applicationIds);
      return res.data.message;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Something error of deleting job"
      );
    }
  }
);

//get single job application
export const getSingleJobApplicationThunk = createAsyncThunk<
  Career,
  string,
  { rejectValue: string }
>("career/getsingle", async (jobId, { rejectWithValue }) => {
  try {
    const res = await getSingleJobApplicationApi(jobId);
    return res.data.singleApplication;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of getting job"
    );
  }
});

//send assignement
export const sendAssignementsThunk = createAsyncThunk<
  string,
  AssignementSend,
  { rejectValue: string }
>("career/sendassignement", async (details, { rejectWithValue }) => {
  try {
    const res = await sendAssignementsApi(details);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of send assignement"
    );
  }
});

//update application status
export const updateApplicationStatusThunk = createAsyncThunk<
  string,
  { applicationIds: string[]; status: string },
  { rejectValue: string }
>("career/updateStatus", async (details, { rejectWithValue }) => {
  try {
    const res = await updateStatusApi(details);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of update status"
    );
  }
});
