import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlogApi, fetchBlogApi } from "./blogApi";
import { AxiosError } from "axios";
import { Blog, CreateBlogResponse } from "../../types/redux/blogInterface";

export const createBlogThunk = createAsyncThunk<
  CreateBlogResponse,
  Blog,
  { rejectValue: string }
>("blog/create", async (data, { rejectWithValue }) => {
  try {
    const res = await createBlogApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});


export const fetcheBlogThunk = createAsyncThunk<
Blog[],
  void,
  { rejectValue: string }
>("blog/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchBlogApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});