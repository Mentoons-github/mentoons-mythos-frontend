import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  commentBlogApi,
  createBlogApi,
  fetchBlogApi,
  fetchSinglBlogApi,
  getCommentBlogApi,
  likeBlogApi,
  replyCommentApi,
  fetchUsersBlogApi,
} from "./blogApi";

import { AxiosError } from "axios";
import {
  Blog,
  Comments,
  CreateBlogResponse,
  GetBlogResponse,
} from "../../types/redux/blogInterface";

export const createBlogThunk = createAsyncThunk<
  CreateBlogResponse,
  Blog,
  { rejectValue: string }
>("blog/create", async (data, { rejectWithValue }) => {
  console.log(data.tags, "dataaaaaaaa");
  try {
    const res = await createBlogApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant create blog"
    );
  }
});

export const fetcheBlogThunk = createAsyncThunk<
  GetBlogResponse,
  { skip: number; limit: number },
  { rejectValue: string }
>("blog/fetch", async ({ skip, limit }, { rejectWithValue }) => {
  try {
    const res = await fetchBlogApi(skip, limit);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog");
  }
});

export const fetchSinglBlogThunk = createAsyncThunk<
  Blog,
  string,
  { rejectValue: string }
>("blog/fetchsingle", async (blogId, { rejectWithValue }) => {
  try {
    const res = await fetchSinglBlogApi(blogId);
    return res.data.blog;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog");
  }
});

export const likeBlogThunk = createAsyncThunk<
  { message: string; likes: string[]; blogId: string },
  string,
  { rejectValue: string }
>("blog/like", async (blogId, { rejectWithValue }) => {
  try {
    const res = await likeBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Like failed");
  }
});

export const commentBlogThunk = createAsyncThunk<
  { message: string },
  { blogId: string; comment: string },
  { rejectValue: string }
>("blog/post-comment", async ({ blogId, comment }, { rejectWithValue }) => {
  try {
    const res = await commentBlogApi(blogId, comment);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Comment posting failed"
    );
  }
});

export const replyCommentThunk = createAsyncThunk<
  { message: string },
  { commentId: string; replyText: string },
  { rejectValue: string }
>(
  "blog/reply-comment",
  async ({ commentId, replyText }, { rejectWithValue }) => {
    try {
      const res = await replyCommentApi(commentId, replyText);
      console.log(replyText, "rwplyyyyyy");
      console.log(res, "ressssssssss");
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Comment posting failed"
      );
    }
  }
);

export const getCommentBlogThunk = createAsyncThunk<
  { message: string; comments: Comments[]; blogId: string },
  string,
  { rejectValue: string }
>("blog/get-comment", async (blogId, { rejectWithValue }) => {
  try {
    const res = await getCommentBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cannot get comments now"
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
