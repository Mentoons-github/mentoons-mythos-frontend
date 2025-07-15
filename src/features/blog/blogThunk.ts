import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentBlogApi, createBlogApi, fetchBlogApi, getCommentBlogApi, likeBlogApi } from "./blogApi";
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
  {skip:number,limit:number},
  { rejectValue: string }
>("blog/fetch", async ({skip,limit}, { rejectWithValue }) => {
  try {
    const res = await fetchBlogApi(skip,limit);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

export const likeBlogThunk = createAsyncThunk<
  {message:string, likes:string[], blogId:string},
  string,
  { rejectValue: string }
>("blog/like", async (blogId, { rejectWithValue }) => {
  try {
    const res = await likeBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

export const commentBlogThunk = createAsyncThunk<
  {message:string},
  {blogId:string,comment:string},
  { rejectValue: string }
>("blog/post-comment", async ({blogId, comment}, { rejectWithValue }) => {
  try {
    const res = await commentBlogApi(blogId,comment);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

export const getCommentBlogThunk = createAsyncThunk<
  {message:string, comments:string[], blogId:string},
  string,
  { rejectValue: string }
>("blog/get-comment", async (blogId, { rejectWithValue }) => {
  try {
    const res = await getCommentBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed"
    );
  }
});

