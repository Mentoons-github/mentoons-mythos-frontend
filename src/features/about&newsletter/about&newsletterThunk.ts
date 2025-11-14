import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  deleteAboutCommentApi,
  getAboutCommentsApi,
  getNewslettersApi,
  getSingleAboutCommentApi,
  postAboutCommentApi,
  sendMessageToMailApi,
  subscribeNewsletterApi,
} from "./about&newsletterApi";
import { IAboutComment, INewsLetter } from "../../types/redux/about&newsletter";

//post comment
export const postAboutCommentThunk = createAsyncThunk<
  string,
  IAboutComment,
  { rejectValue: string }
>("about/post", async (data, { rejectWithValue }) => {
  try {
    const res = await postAboutCommentApi(data);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant Post message"
    );
  }
});

// get comments
export const getAboutCommentThunk = createAsyncThunk<
  { comments: IAboutComment[]; page: number; totalPages: number },
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>(
  "about/comments",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await getAboutCommentsApi(page, limit, sort, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Cant fetch messages"
      );
    }
  }
);

//get single comment
export const getSingleAboutCommentThunk = createAsyncThunk<
  IAboutComment,
  string,
  { rejectValue: string }
>("about/singlecomment", async (commentId, { rejectWithValue }) => {
  try {
    const res = await getSingleAboutCommentApi(commentId);
    return res.data.comment;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant fetch message"
    );
  }
});

//delete comment
export const deleteAboutCommentThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("about/delete-comment", async (commentId, { rejectWithValue }) => {
  try {
    const res = await deleteAboutCommentApi(commentId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant delete comment"
    );
  }
});

/************************************************************************************ */

//newsletter

//subscribe newsletter
export const subscribeNewsletterThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("newsletter/subscribe", async (email, { rejectWithValue }) => {
  try {
    const res = await subscribeNewsletterApi(email);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant subscribe newsletter"
    );
  }
});

// get newsletters
export const getNewsletterThunk = createAsyncThunk<
  { letters: INewsLetter[]; page: number; totalPages: number },
  { page: number; limit: number; sort?: string; search?: string },
  { rejectValue: string }
>(
  "newsletter/get",
  async ({ page, limit, sort, search }, { rejectWithValue }) => {
    try {
      const res = await getNewslettersApi(page, limit, sort, search);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Cant fetch newsletters"
      );
    }
  }
);

//get single newsletter
export const getSingleNewsletterThunk = createAsyncThunk<
  INewsLetter,
  string,
  { rejectValue: string }
>("newsletter/singleletter", async (newsletterId, { rejectWithValue }) => {
  try {
    const res = await getSingleAboutCommentApi(newsletterId);
    return res.data.letter;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant fetch newsletter"
    );
  }
});

//delete letter
export const deleteNewsletterThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("newsletter/delete-letter", async (newsletterId, { rejectWithValue }) => {
  try {
    const res = await deleteAboutCommentApi(newsletterId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant delete newsletter"
    );
  }
});

//send message to mail
export const sendMessageToMailThunk = createAsyncThunk<
  string,
  { emails: string[]; subject: string; message: string },
  { rejectValue: string }
>(
  "newsletter/sendmessage",
  async ({ emails, subject, message }, { rejectWithValue }) => {
    try {
      const res = await sendMessageToMailApi({ emails, subject, message });
      return res.data.message;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "Cant send message to mails"
      );
    }
  }
);
