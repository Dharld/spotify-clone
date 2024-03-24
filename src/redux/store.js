import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.slice";
import trackReducer from "./slices/tracks/tracks.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    track: trackReducer,
  },
});
