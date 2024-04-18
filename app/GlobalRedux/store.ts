import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  // middleware: (getDefaltMiddleware) => {
  //   getDefaltMiddleware({ serializableCheck: false });
  // },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type appDispatch = typeof store.dispatch;
