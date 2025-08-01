import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../types/redux/chatInterfaces";
import { getChatThunk } from "./chatThunk";

interface SliceChat {
  data: Chat[];
  error: null | string | undefined;
  loading: boolean;
}

const initialState: SliceChat = {
  data: [],
  error: null,
  loading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getChatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
