import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./authThunk";
import { RegisterResponse } from "../../types/redux/authInterfaces";

interface Auth {
    message: RegisterResponse |string,
    success: boolean,
    loading:boolean,
    error: string | null | undefined
}

const initialState:Auth = {
    message: "",
    success:false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false
    },
  },
  extraReducers:(builder)=> {
    builder
        .addCase(registerThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message
            state.success = true;
        })
        .addCase(registerThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

  }
});

export default authSlice.reducer 
export const {resetAuthState} = authSlice.actions

