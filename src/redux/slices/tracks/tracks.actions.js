import { createAsyncThunk } from "@reduxjs/toolkit";
import RecentlyPlayedItem from "../../../models/RecentlyPlayed.model";
import axios from "axios";

const apiURL = import.meta.env.VITE_CLOUD_URL;

// Define the async thunk action
export const fetchTracks = createAsyncThunk(
  "tracks/fetchTracks",
  async (token) => {
    try {
      const response = await axios
        .get(`${apiURL}/getRecentlyPlayedTracks?=token${token}`)
        .then((res) => res.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const fetchFeaturedPlaylists = createAsyncThunk(
  "tracks/fetchFeaturedPlaylists",
  async (token) => {
    try {
      const response = await axios
        .get(`${apiURL}/getFeaturedPlaylists?token=${token}`)
        .then((res) => res.data);

      const returnedPlaylists = response.data.playlists.items.map((p) => {
        return {
          desc: p.description,
          images: p.images,
          name: p.name,
          tracks: p.tracks,
        };
      });

      console.log(returnedPlaylists);

      return returnedPlaylists;
    } catch (error) {
      console.error(error);
      throw error.response.data;
    }
  }
);

export const fetchRecentlyPlayedTracks = createAsyncThunk(
  "tracks/fetchRecentlyPlayedTracks",
  async (token) => {
    try {
      const response = await axios
        .get(`${apiURL}/getRecentlyPlayedTracks?token=${token}&limit=${8}`)
        .then((res) => res.data);

      const items = response.data.map((el) => {
        const track = el.track;
        const label = track.name;
        const previewUrl = track.preview_url;
        const imgUrl = track.album.images[2].url;
        const artists = track.artists;

        return { label, previewUrl, imgUrl, artists };
      });

      return items;
    } catch (error) {
      console.error(error);
      throw error.response.data;
    }
  }
);
