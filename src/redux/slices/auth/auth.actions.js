import {
  auth,
  addUser,
  userExists,
  getUserByUUID,
} from "../../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const setTempUser = createAction("auth/setTempUser");

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
    const { email, password } = creds;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      const uid = user.uid;
      let userStored = await getUserByUUID(uid);
      const createdAt = userStored.createdAt
        ? userStored.createdAt.toString()
        : null;
      return {
        ...userStored,
        createdAt,
      };
    } else {
      throw new Error("Invalid credentials");
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
  const { email, password } = creds;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  creds.provider = "Email and Password";
  creds.createdAt = new Date();

  await addUser(user.uid, creds);

  return user.providerData; // Return user object if signup is successful
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
  return null;
});
