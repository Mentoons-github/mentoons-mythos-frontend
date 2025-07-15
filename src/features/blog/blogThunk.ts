import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlogApi, fetchBlogApi, fetchUsersBlogApi } from "./blogApi";
import { AxiosError } from "axios";
import {
  Blog,
  CreateBlogResponse,
  GetBlogResponse,
} from "../../types/redux/blogInterface";

export const createBlogThunk = createAsyncThunk<
  CreateBlogResponse,
  Blog,
  { rejectValue: string }
>("blog/create", async (data, { rejectWithValue }) => {
  console.log(data.tags,'dataaaaaaaa')
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
  GetBlogResponse,
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

export const fetchCurrentUserBlog = createAsyncThunk<
  Blog[],
  void,
  { rejectValue: string }
>("blog/Currentfetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchUsersBlogApi();
    return res.data.blogs;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

