import { createSlice } from "@reduxjs/toolkit";
import { availableSlotsThunk, bookSlotThunk } from "./bookCallThunk";
import { AvailbleSlots } from "../../types/bookCall/bookCall.type";

interface BookSlice {
  slots: AvailbleSlots | null;
  loading: boolean;
  slotsLoading: boolean;
  error: null | string | undefined;
  message: string;
  success: boolean;
  complete: boolean;
}

const initialState: BookSlice = {
  slots: null as AvailbleSlots | null,
  loading: false,
  slotsLoading: false,
  error: null,
  message: "",
  success: false,
  complete: false,
};

const bookCallSlice = createSlice({
  name: "book_call",
  initialState,
  reducers: {
    resetBookCallSlice: (state) => {
      state.message = "";
      state.error = null;
      state.success = false;
      state.loading = false;
      state.slotsLoading = false;
    },
    resetCompleteBookSlice: (state) => {
      state.complete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(availableSlotsThunk.pending, (state) => {
        state.slotsLoading = true;
        state.error = null;
      })
      .addCase(availableSlotsThunk.fulfilled, (state, action) => {
        state.slotsLoading = false;
        state.error = null;
        state.slots = action.payload;
      })
      .addCase(availableSlotsThunk.rejected, (state, action) => {
        state.slotsLoading = false;
        state.error = action.payload;
      })

      //booking
      .addCase(bookSlotThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.complete = false;
      })
      .addCase(bookSlotThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
        state.complete = true;
      })
      .addCase(bookSlotThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.complete = false;
      });
  },
});

export default bookCallSlice.reducer;
export const { resetBookCallSlice, resetCompleteBookSlice } = bookCallSlice.actions;
