import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";
import userReducer from "../features/user/userSlice";
import astroReducer from "../features/astrology/astroSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    user: userReducer,
    astro: astroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
