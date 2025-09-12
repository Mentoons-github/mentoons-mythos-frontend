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
  updateBlogViewApi,
  fetchByMostReadApi,
  searchBlogApi,
  deleteBlogApi,
  deleteCommentApi,
  fetchBlogCountApi,
} from "./blogApi";

import { AxiosError } from "axios";
import {
  Blog,
  Comments,
  CreateBlogResponse,
  GetBlogResponse,
  SearchBlogResponses,
} from "../../types/redux/blogInterface";

//create blog
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

//fetch blog
export const fetcheBlogThunk = createAsyncThunk<
  GetBlogResponse,
  { skip: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>("blog/fetch", async ({ skip, limit, sort, search }, { rejectWithValue }) => {
  try {
    const res = await fetchBlogApi(skip, limit, sort, search);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog");
  }
});

//fetch blog count
export const fetcheBlogCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("blog/fetchblog-count", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchBlogCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog count");
  }
});

//fetch single blog
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

//like blog
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

//comment blog
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

//reply comment
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

//get comment
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

//delete comment
export const deleteCommentThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("blog/delete-comment", async (commentId, { rejectWithValue }) => {
  try {
    const res = await deleteCommentApi(commentId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cannot get comments now"
    );
  }
});

//current user blog
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
      error?.response?.data?.message || "Cannot fetch user blog"
    );
  }
});

//update blog view
export const updateBlogViewThunk = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("blog/updateViewCount", async (blogId, { rejectWithValue }) => {
  try {
    const res = await updateBlogViewApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Views increment failed"
    );
  }
});

//fetch by most read blog
export const fetchByMostReadThunk = createAsyncThunk<
  Blog[],
  void,
  { rejectValue: string }
>("blog/fetchByMostRead", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchByMostReadApi();
    return res.data.blogs;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Feth Blog failed"
    );
  }
});

//search blog
export const searchBlogThunk = createAsyncThunk<SearchBlogResponses, string>(
  "blog/search",
  async (search, { rejectWithValue }) => {
    try {
      const res = await searchBlogApi(search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Feth Blog failed"
      );
    }
  }
);

export const deleteBlogThunk = createAsyncThunk<
  { message: string; blogId: string },
  string,
  { rejectValue: string }
>("blog/deleteblog", async (blogId, { rejectWithValue }) => {
  try {
    const res = await deleteBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Delete Blog failed"
    );
  }
});
