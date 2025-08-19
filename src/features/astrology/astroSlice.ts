import { createSlice } from "@reduxjs/toolkit";
import { IAstrologyDetail } from "../../types";
import { fetchMoonAndSunSign, upsertUserZodiacDetail } from "./astroThunk";

interface AstroInterface {
  result: IAstrologyDetail | null;
  error: null | string | undefined;
  loading: boolean;
}

const initialState: AstroInterface = {
  result: null,
  error: "",
  loading: false,
};

const astroSlice = createSlice({
  name: "astrology",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchMoonAndSunSign.fulfilled, (state, action) => {
        state.result = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchMoonAndSunSign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoonAndSunSign.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //upsert
      .addCase(upsertUserZodiacDetail.fulfilled, (state, action) => {
        state.result = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(upsertUserZodiacDetail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(upsertUserZodiacDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default astroSlice.reducer;
