import { auth, addUser, userExists } from "../../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, credentials }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, credentials);
    console.log(user);
  }
);

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
      };
      await addUser(returnedUser);
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

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await addUser(user, { email, password });

    return user.providerData; // Return user object if signup is successful
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
  return null;
});
