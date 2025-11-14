import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getIntelligenceGroupMembersApi,
  getRashiGroupMembersApi,
} from "./groupApi";
import { AxiosError } from "axios";
import { IUser } from "../../types";

export const getRashiGroupMembersThunk = createAsyncThunk<
  { users: IUser[] },
  string,
  { rejectValue: string }
>("group/rashi-members", async (rashi, { rejectWithValue }) => {
  try {
    const res = await getRashiGroupMembersApi(rashi);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching members"
    );
  }
});

export const getIntelligenceGroupMembersThunk = createAsyncThunk<
  { users: IUser[] },
  string,
  { rejectValue: string }
>("group/intelligence-members", async (intelligence, { rejectWithValue }) => {
  try {
    const res = await getIntelligenceGroupMembersApi(intelligence);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Something error of fetching members"
    );
  }
});
