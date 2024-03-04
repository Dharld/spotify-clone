/* eslint-disable no-useless-catch */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially no user is logged in
  loading: false, // Initially not loading
  error: null, // Initially no error
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // Handle fulfilled actions for all async thunk actions
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false; // Set loading to false for
          if (!action.type.startsWith("auth/check")) {
            state.user = action.payload; // Set user from action payload
          }
        }
      )
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.error; // Set error message from action payload
        }
      );
  },
});

// Export authentication slice
export default authSlice.reducer;
