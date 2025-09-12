import { createAsyncThunk } from "@reduxjs/toolkit";
import { availbleSlotsApi, bookSlotApi } from "./bookCallApi";
import { AxiosError } from "axios";
import { AvailbleSlots, BookDatas } from "../../types/bookCall/bookCall.type";

export const availableSlotsThunk = createAsyncThunk<
  AvailbleSlots,
  { date: string; type: string },
  { rejectValue: string }
>("book-call/available-slots", async ({ date, type }, { rejectWithValue }) => {
  try {
    const res = await availbleSlotsApi({ date, type });
    return res.data.slots;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Error get Slots");
  }
});

export const bookSlotThunk = createAsyncThunk<
  string,
  BookDatas,
  { rejectValue: string }
>("book-call/book-slots", async (data, { rejectWithValue }) => {
  try {
    const res = await bookSlotApi(data);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Error booking Slots");
  }
});
