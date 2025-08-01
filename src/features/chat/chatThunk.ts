import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatApi } from "./chatApi";
import { AxiosError } from "axios";
import { Chat } from "../../types/redux/chatInterfaces";

export const getChatThunk = createAsyncThunk<
  Chat[],
  string,
  { rejectValue: string }
>("blog/fetchByMostRead", async (groupId, { rejectWithValue }) => {
  try {
    const res = await getChatApi(groupId);
    return res.data.chats;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Feth Chat failed"
    );
  }
});