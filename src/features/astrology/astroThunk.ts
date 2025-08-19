import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSunsignAndMoonsign, updateZodiac } from "./astroService";
import { IAstrologyDetail } from "../../types";
import { AxiosError } from "axios";
import { ZodiacDetails } from "../../types";

export const fetchMoonAndSunSign = createAsyncThunk<IAstrologyDetail>(
  "astrology/moonAndSun",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSunsignAndMoonsign();
      console.log("signs :", response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error?.response?.data?.message || "failed fetch sun sign and moon sign"
      );
    }
  }
);

export const upsertUserZodiacDetail = createAsyncThunk<
  IAstrologyDetail,
  ZodiacDetails
>(
  "astrology/updateZodiac",
  async (data: ZodiacDetails, { rejectWithValue }) => {
    try {
      const response = await updateZodiac(data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
