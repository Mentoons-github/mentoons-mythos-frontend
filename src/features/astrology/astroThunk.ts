import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "./astroService";
import { IAstrologyDetail, IUser } from "../../types";
import { AxiosError } from "axios";

export const fetchMoonAndSunSign = createAsyncThunk<
  IAstrologyDetail,
  { user: IUser }
>("astrology/moonAndSun", async ({ user }, { rejectWithValue }) => {
  try {
    const response = await updateUser(user);
    console.log("signs :", response.data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "failed fetch sun sign and moon sign"
    );
  }
});
