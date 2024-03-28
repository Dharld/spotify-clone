import { auth, addUser, userExists } from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const setTempUser = createAction("auth/setTempUser");

const apiURL = import.meta.env.VITE_CLOUD_URL;

export const checkUserExistence = createAsyncThunk(
  "auth/checkUserExistence",
  async (email) => {
    try {
      const res = await userExists(email);
      if (res) {
        throw {
          message: "This address is already linked to an existing account.",
        };
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

// Asynchronous actions
export const login = createAsyncThunk("auth/login", async (creds) => {
  try {
    const { email, password, token } = creds;
    let res;

    if (token) {
      res = await axios
        .post(`${apiURL}/login`, {
          token: token,
        })
        .then((res) => res.data);
    } else {
      res = await axios
        .post(`${apiURL}/login`, {
          email,
          password,
        })
        .then((res) => res.data);
    }

    if (res.success) {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } else {
      throw new Error(res.message);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
});

export const signinWithGoogle = createAsyncThunk(
  "auth/signinWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res) {
      // The signed-in user info.
      const { uid, email, displayName, photoURL } = res.user;

      const returnedUser = {
        uid,
        email,
        displayName,
        photoURL,
        createdAt: res.user.metadata.createdAt,
        provider: "Google",
      };

      await addUser(returnedUser.uid, returnedUser);
      return returnedUser;
    }
  }
);

export const signInWithFacebook = createAsyncThunk(
  "auth/signinWithFacebook",
  async () => {
    const provider = new FacebookAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res) {
      // The signed-in user info.
      // const { uid, email, displayName, photoURL } = res.user;
      console.log(res.user);
    }
  }
);

export const signup = createAsyncThunk("auth/signup", async (creds) => {
  try {
    const res = await axios
      .post(`${apiURL}/signup`, creds)
      .then((res) => res.data);

    if (res.success) {
      const token = res.data.token;
      localStorage.setItem("token", token);
      return null;
    } else {
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
  return null;
});

// Authorization
export const authorizeSpotify = createAsyncThunk(
  "auth/authorizeSpotify",
  async () => {
    const token = localStorage.getItem("token");
    window.location.href = `${apiURL}/authorizeSpotify?token=${token}`;
  }
);
