"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type Rootstate = ReturnType<typeof store.getstate>;
export type appDispatch = typeof store.dispatch;
