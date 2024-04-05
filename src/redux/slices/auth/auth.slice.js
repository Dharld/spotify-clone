/* eslint-disable no-useless-catch */
import { createSlice } from "@reduxjs/toolkit";
import { setTempUser } from "./auth.actions";

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return undefined; // If user is not found in local storage, return undefined
    }
    return JSON.parse(serializedUser); // Parse serialized user from local storage
  } catch (err) {
    return undefined; // If error occurs during parsing, return undefined
  }
};

const initialState = {
  tempUser: null,
  user: loadUserFromLocalStorage(), // Initially no user is logged in
  loading: false, // Initially not loading
  error: null, // Initially no error
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("auth/login/fulfilled", (state, action) => {
        const { user } = action.payload;
        return user;
      })
      .addCase(setTempUser, (state, action) => {
        state.tempUser = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // Handle fulfilled actions for all async thunk actions
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false; // Set loading to false for
          if (!action.type.startsWith("auth/check")) {
            state.user = action.payload; // Set user from action payload
            localStorage.setItem("user", JSON.stringify(action.payload));
          }
        }
      )
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.error; // Set error message from action payload
        }
      );
  },
});

// Export authentication slice
export default authSlice.reducer;
