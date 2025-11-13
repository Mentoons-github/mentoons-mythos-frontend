import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationTypes } from "../../types/notification";
import {
  deleteAllNotificationsApi,
  deleteSingleNotificationApi,
  getFirst3NotificationApi,
  getNotificationsApi,
  getUnreadCountApi,
  markAllNotificationsAsReadApi,
  markNotificationAsReadApi,
} from "./notificationApi";
import { AxiosError } from "axios";

// get all notification
export const getNotificationsThunk = createAsyncThunk<
  NotificationTypes[],
  { limit?: number; lastDate?: string },
  { rejectValue: string }
>("notification/get", async ({ limit, lastDate }, { rejectWithValue }) => {
  try {
    const res = await getNotificationsApi(limit, lastDate);
    return res.data.notifications;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications fetch failed"
    );
  }
});

//unread count
export const getUnreadCountThunk = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("notification/unread", async (_, { rejectWithValue }) => {
  try {
    const res = await getUnreadCountApi();
    return res.data.count;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications count fetch failed"
    );
  }
});

//mark as read
export const markNotificationAsReadThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/markasread", async (notificationId, { rejectWithValue }) => {
  try {
    const res = await markNotificationAsReadApi(notificationId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications mark as read failed"
    );
  }
});

//mark all read
export const markAllNotificationsAsReadThunk = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("employee/markallasread", async (_, { rejectWithValue }) => {
  try {
    const res = await markAllNotificationsAsReadApi();
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications mark as read failed"
    );
  }
});

//delete single notification
export const deleteSingleNotificationThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/delete-one", async (notificationId, { rejectWithValue }) => {
  try {
    const res = await deleteSingleNotificationApi(notificationId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications delete failed"
    );
  }
});

//delete all notification
export const deleteAllNotificationsThunk = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("employee/delete-all", async (_, { rejectWithValue }) => {
  try {
    const res = await deleteAllNotificationsApi();
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications delete failed"
    );
  }
});

//get first 3 notification
export const getFirst3NotificationThunk = createAsyncThunk<
  NotificationTypes[],
  void,
  { rejectValue: string }
>("notification/first3", async (_, { rejectWithValue }) => {
  try {
    const res = await getFirst3NotificationApi();
    return res.data.notifications;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data.message || "Notifications fetch failed"
    );
  }
});
