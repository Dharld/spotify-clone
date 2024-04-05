import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeaturedPlaylists,
  fetchRecentlyPlayedTracks,
  fetchTracks,
} from "./tracks.actions";

// Define the initial state
const initialState = {
  featuredPlaylists: [],
  recentlyPlayedTracks: [],
  tracks: [],
  loading: false,
  error: null,
};

// Create the tracks slice
const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle rejected actions for all async thunk actions
      .addCase(fetchFeaturedPlaylists.fulfilled, (state, action) => {
        state.featuredPlaylists = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecentlyPlayedTracks.fulfilled, (state, action) => {
        state.recentlyPlayedTracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) =>
          action.type.startsWith("tracks") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.error; // Set error message from action payload
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tracks") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the tracks reducer
export default tracksSlice.reducer;
