import {
  auth,
  addUser,
  userExists,
  signup as firebaseSignup,
} from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const setTempUser = createAction("auth/setTempUser");

const apiURL = import.meta.env.VITE_CLOUD_URL;

export const checkUserExistence = createAsyncThunk(
  "auth/checkUserExistence",
  async (email) => {
    const res = await userExists(email);
    if (res) {
      throw {
        message: "This address is already linked to an existing account.",
      };
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
      return res.data;
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
  creds.provider = "Email and Password";
  creds.createdAt = new Date();
  const res = await firebaseSignup(creds);
  if (res.success) {
    const idToken = res.idToken;
    localStorage.setItem("idToken", idToken);
    return null;
  } else {
    throw new Error(res.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
  return null;
});
