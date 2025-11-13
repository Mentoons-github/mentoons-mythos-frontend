import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import {
  getIntelligenceGroupMembersThunk,
  getRashiGroupMembersThunk,
} from "./groupThunk";

interface GroupSliceInterface {
  loading: boolean;
  success: boolean;
  error: null | string;
  rashiUsers: IUser[];
  intelligenceUsers: IUser[];
}

const initialState: GroupSliceInterface = {
  loading: false,
  success: false,
  error: null,
  rashiUsers: [],
  intelligenceUsers: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    resetGroupSlice: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      //rashi members
      .addCase(getRashiGroupMembersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getRashiGroupMembersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rashiUsers = action.payload.users;
        state.success = true;
      })
      .addCase(getRashiGroupMembersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //intelligence members
      .addCase(getIntelligenceGroupMembersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getIntelligenceGroupMembersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.intelligenceUsers = action.payload.users;
        state.success = true;
      })
      .addCase(getIntelligenceGroupMembersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default groupSlice.reducer;
export const { resetGroupSlice } = groupSlice.actions;
