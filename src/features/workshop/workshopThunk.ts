import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addWorkshopApi,
  deleteEnquiryApi,
  deleteWorkshopApi,
  fetchEnquiryCountApi,
  fetchWorkshopCountApi,
  getAllWorkshopsApi,
  registerWorkshopApi,
  singleEnquiryApi,
  singleWorkshopApi,
  updateWorkshopApi,
  workshopEnquiriesApi,
} from "./workshopApi";
import { AxiosError } from "axios";
import {
  EnquiryI,
  GetEnquiriesResponse,
  GetWorkshopResponse,
  WorkshopI,
} from "../../types/redux/workshopInterface";

//add new workshop
export const addWorkshopThunk = createAsyncThunk<
  { message: string; workshop: WorkshopI },
  WorkshopI,
  { rejectValue: string }
>("workshop/add-new", async (details, { rejectWithValue }) => {
  try {
    const res = await addWorkshopApi(details);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop registration failed"
    );
  }
});

//update workshop
export const updateWorkshopThunk = createAsyncThunk<
  { message: string; editedWorkshop: WorkshopI },
  { workshop: WorkshopI; workshopId: string },
  { rejectValue: string }
>("workshop/update", async ({ workshop, workshopId }, { rejectWithValue }) => {
  try {
    const res = await updateWorkshopApi(workshop, workshopId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop registration failed"
    );
  }
});

// register workshop
export const workshopRegisterThunk = createAsyncThunk<
  string,
  { details: EnquiryI; workshopId: string },
  { rejectValue: string }
>("workshop/register", async ({ details, workshopId }, { rejectWithValue }) => {
  try {
    const res = await registerWorkshopApi(details, workshopId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop registration failed"
    );
  }
});

//get workshops
export const getWorkshopsThunk = createAsyncThunk<
  GetWorkshopResponse,
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>(
  "workshop/getall",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await getAllWorkshopsApi(page, limit, sort, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Workshop Enquiry fetch failed"
      );
    }
  }
);

//get enquiries
export const workshopEnquiriesThunk = createAsyncThunk<
  GetEnquiriesResponse,
  { page: number; limit: number; sort: string; search?: string },
  { rejectValue: string }
>(
  "workshop/enquiries",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await workshopEnquiriesApi(page, limit, sort, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Workshop Enquiry fetch failed"
      );
    }
  }
);

// fetch workshop count
export const fetchWorkshopCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("workshop/count", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchWorkshopCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop count fetch failed"
    );
  }
});

//get single workshop
export const SingleWorkshopThunk = createAsyncThunk<
  WorkshopI,
  string,
  { rejectValue: string }
>("workshop/single-workshop", async (workshopId, { rejectWithValue }) => {
  try {
    const res = await singleWorkshopApi(workshopId);
    return res.data.workshop;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop fetch failed"
    );
  }
});

//delete workshop
export const deleteWorkshopThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("workshop/delete", async (workshopId, { rejectWithValue }) => {
  try {
    const res = await deleteWorkshopApi(workshopId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop delete failed"
    );
  }
});

// fetch enquiry count
export const fetchEnquiryCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("workshop/enquiries-count", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchEnquiryCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop Enquiry count fetch failed"
    );
  }
});

//get single enquiry
export const SingleEnquiryThunk = createAsyncThunk<
  EnquiryI,
  string,
  { rejectValue: string }
>("workshop/singleenquiry", async (enquiryId, { rejectWithValue }) => {
  try {
    const res = await singleEnquiryApi(enquiryId);
    return res.data.enquiry;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop Enquiry fetch failed"
    );
  }
});

//delete enquiries
export const deleteEnquiryThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("workshop/deleteenquiry", async (enquiryId, { rejectWithValue }) => {
  try {
    const res = await deleteEnquiryApi(enquiryId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Workshop Enquiry delete failed"
    );
  }
});
