import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collectBadgeApi,
  createNewBadgeApi,
  deleteBadgeApi,
  editBadgeApi,
  fetchBadgeAnimationApi,
  getAllBadgesApi,
  getMyBadgesApi,
  getSingleBadgeApi,
  removeBadgeFromUserApi,
} from "./badgeApi";
import { AxiosError } from "axios";
import { MyBadge } from "../../types/user/userInterface";
import { Badge } from "../../types/redux/blogInterface";

//create new badge
export const createBadgeThunk = createAsyncThunk<
  { message: string; badge: Badge },
  Badge,
  { rejectValue: string }
>("badge/create", async (newBadgeData, { rejectWithValue }) => {
  try {
    const res = await createNewBadgeApi(newBadgeData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge collection failed",
    );
  }
});

// collect badge
export const collectBadgeThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("badge/collect", async (badgeId, { rejectWithValue }) => {
  try {
    const res = await collectBadgeApi(badgeId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge collection failed",
    );
  }
});

//my badges
export const getMyBadgesThunk = createAsyncThunk<
  MyBadge[],
  void,
  { rejectValue: string }
>("badge/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await getMyBadgesApi();
    return res.data.userBadges.badges;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge fetch failed",
    );
  }
});

//get all badges
export const getAllBadgesThunk = createAsyncThunk<
  Badge[],
  void,
  { rejectValue: string }
>("badge/all", async (_, { rejectWithValue }) => {
  try {
    const res = await getAllBadgesApi();
    return res.data.badges;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge fetch failed",
    );
  }
});

//get single badge
export const getSingleBadgeThunk = createAsyncThunk<
  Badge,
  string,
  { rejectValue: string }
>("badge/single", async (badgeId, { rejectWithValue }) => {
  try {
    const res = await getSingleBadgeApi(badgeId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge fetch failed",
    );
  }
});

// remove badge
export const removeBadgeFromUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("badge/remove/user", async (badgeId, { rejectWithValue }) => {
  try {
    const res = await removeBadgeFromUserApi(badgeId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge remove failed",
    );
  }
});

// delete badge
export const deleteBadgeThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("badge/delete", async (badgeId, { rejectWithValue }) => {
  try {
    const res = await deleteBadgeApi(badgeId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data.message || "Badge delete failed",
    );
  }
});

// edit badge
export const editBadgeThunk = createAsyncThunk<
  { message: string; editedBadge: Badge },
  { badgeId: string; badgeData: Badge },
  { rejectValue: string }
>("badge/edit", async ({ badgeId, badgeData }, { rejectWithValue }) => {
  try {
    const res = await editBadgeApi(badgeId, badgeData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data.message || "Badge edit failed");
  }
});

// fetch animation badge
export const fetchBadgeAnimationThunk = createAsyncThunk<
  Record<string, unknown>,
  string,
  { rejectValue: string }
>("badge/animation", async (badgeId, { rejectWithValue }) => {
  try {
    const res = await fetchBadgeAnimationApi(badgeId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data.message || "Badge edit failed");
  }
});
