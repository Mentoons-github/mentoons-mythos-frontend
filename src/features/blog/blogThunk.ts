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
  getReplyCommentBlogApi,
  editCommentBlogApi,
  commentOffToggleApi,
  saveBlogApi,
  userSavedBlogsApi,
} from "./blogApi";

import { AxiosError } from "axios";
import {
  Comments,
  CreateBlogResponse,
  GetBlogResponse,
  IBlogV2,
  IReply,
  Reward,
  SearchBlogResponses,
} from "../../types/redux/blogInterface";

//create blog
export const createBlogThunk = createAsyncThunk<
  CreateBlogResponse,
  IBlogV2,
  { rejectValue: string }
>("blog/create", async (data, { rejectWithValue }) => {
  try {
    const res = await createBlogApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant create blog",
    );
  }
});

//fetch blog
export const fetcheBlogThunk = createAsyncThunk<
  GetBlogResponse,
  { skip: number; limit: number; sort?: string },
  { rejectValue: string }
>("blog/fetch", async ({ skip, limit, sort }, { rejectWithValue }) => {
  try {
    const res = await fetchBlogApi(skip, limit, sort);
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
    return rejectWithValue(
      error?.response?.data?.message || "Cant fetch blog count",
    );
  }
});

//fetch single blog
export const fetchSinglBlogThunk = createAsyncThunk<
  IBlogV2,
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
  {
    message: string;
    likes: string[];
    blogId: string;
    reward: Reward;
  },
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
  { message: string; reward: Reward; newComment: Comments },
  { blogId: string; comment: string },
  { rejectValue: string }
>("blog/post-comment", async ({ blogId, comment }, { rejectWithValue }) => {
  try {
    const res = await commentBlogApi(blogId, comment);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Comment posting failed",
    );
  }
});

//reply comment
export const replyCommentThunk = createAsyncThunk<
  { message: string; comment: IReply },
  { commentId: string; replyText: string; replyToUserId: string },
  { rejectValue: string }
>(
  "blog/reply-comment",
  async ({ commentId, replyText, replyToUserId }, { rejectWithValue }) => {
    try {
      const res = await replyCommentApi(commentId, replyText, replyToUserId);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Comment posting failed",
      );
    }
  },
);

//get comment
export const getCommentBlogThunk = createAsyncThunk<
  { message: string; comments: Comments[]; blogId: string; total: number },
  { blogId: string; skip: number; limit: number },
  { rejectValue: string }
>("blog/get-comment", async ({ blogId, limit, skip }, { rejectWithValue }) => {
  try {
    const res = await getCommentBlogApi(blogId, skip, limit);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cannot get comments now",
    );
  }
});

//get reply comment
export const getReplyCommentBlogThunk = createAsyncThunk<
  { message: string; replyComments: IReply[]; total: number },
  { commentId: string; skip: number; limit: number },
  { rejectValue: string }
>(
  "blog/get-commentreply",
  async ({ commentId, skip, limit }, { rejectWithValue }) => {
    try {
      const res = await getReplyCommentBlogApi(commentId, skip, limit);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Cannot get comments now",
      );
    }
  },
);

//delete comment
export const deleteCommentThunk = createAsyncThunk<
  { message: string; reward: Reward; type: "comment" | "replyComment" },
  string,
  { rejectValue: string }
>("blog/delete-comment", async (commentId, { rejectWithValue }) => {
  try {
    const res = await deleteCommentApi(commentId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cannot get comments now",
    );
  }
});

//current user blog
export const fetchCurrentUserBlog = createAsyncThunk<
  IBlogV2[],
  void,
  { rejectValue: string }
>("blog/Currentfetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchUsersBlogApi();
    return res.data.blogs;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cannot fetch user blog",
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
      error?.response?.data?.message || "Views increment failed",
    );
  }
});

//fetch by most read blog
export const fetchByMostReadThunk = createAsyncThunk<
  IBlogV2[],
  void,
  { rejectValue: string }
>("blog/fetchByMostRead", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchByMostReadApi();
    return res.data.blogs;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Feth Blog failed",
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
        error?.response?.data?.message || "Feth Blog failed",
      );
    }
  },
);

//delete blog
export const deleteBlogThunk = createAsyncThunk<
  { message: string; blogId: string; reward: Reward },
  string,
  { rejectValue: string }
>("blog/deleteblog", async (blogId, { rejectWithValue }) => {
  try {
    const res = await deleteBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Delete Blog failed",
    );
  }
});

//edit blog
export const editCommentBlogThunk = createAsyncThunk<
  {
    message: string;
    updated: IReply | Comments;
    type: "comment" | "replyComment";
  },
  { commentId: string; newComment: string },
  { rejectValue: string }
>(
  "blog/edit-comment",
  async ({ commentId, newComment }, { rejectWithValue }) => {
    try {
      const res = await editCommentBlogApi(commentId, newComment);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Comment posting failed",
      );
    }
  },
);

//comment off toggle
export const commentOffToggleThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("blog/commentoffToggle", async (blogId, { rejectWithValue }) => {
  try {
    const res = await commentOffToggleApi(blogId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Comment posting failed",
    );
  }
});

//like blog
export const saveBlogThunk = createAsyncThunk<
  {
    message: string;
    saved: boolean;
    blogId: string;
    reward: Reward;
  },
  string,
  { rejectValue: string }
>("blog/save", async (blogId, { rejectWithValue }) => {
  try {
    const res = await saveBlogApi(blogId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Save failed");
  }
});

// user saved blogs
export const userSavedBlogsThunk = createAsyncThunk<
  IBlogV2[],
  void,
  { rejectValue: string }
>("blog/user/saved", async (_, { rejectWithValue }) => {
  try {
    const res = await userSavedBlogsApi();
    return res.data.savedPosts;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Saved fetch failed",
    );
  }
});
