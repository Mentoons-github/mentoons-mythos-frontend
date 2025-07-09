import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authThunk";

interface Auth {
  message: string;
  accessToken: string | null;
  userId: string | null;
  success: boolean;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: Auth = {
  message: "",
  accessToken: localStorage.getItem("token"),
  userId: null,
  success: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
      state.accessToken = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        // const {accessToken, _id} = action.payload.user

        //  localStorage.setItem("token", accessToken);

        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        // state.accessToken = accessToken;
        // state.userId = _id;
        state.success = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;
