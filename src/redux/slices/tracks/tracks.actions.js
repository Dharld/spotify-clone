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

export const fetchRecentlyPlayedTracks = createAsyncThunk(
  "tracks/fetchRecentlyPlayedTracks",
  async (token) => {
    try {
      const response = await axios
        .get(`${apiURL}/getRecentlyPlayedTracks?token=${token}&limit=${8}`)
        .then((res) => res.data);

      console.log(response);
      const items = response.data.map((el) => {
        const track = el.track;
        const label = track.name;
        const previewUrl = track.preview_url;
        const imgUrl = track.album.images[2].url;

        return { label, previewUrl, imgUrl };
      });

      return items;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);
