import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import jwt from "jsonwebtoken";

const firebaseConfig = {
  apiKey: "AIzaSyC5UMR3NXDTiP6g42fHPRM92f5nP2CWPzM",
  authDomain: "localhost:9099",
  databaseURL: "http://localhost:8080",
  projectId: "spotify-9a74d",
  storageBucket: "spotify-9a74d.appspot.com",
  messagingSenderId: "934493280858",
  appId: "1:934493280858:web:7fb6d565ca5df775341663",
  measurementId: "G-L44DCMK533",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, "localhost", 8080);

const jwtSecret = import.meta.env.VITE_JWT_SECRET;
console.log(jwtSecret);

export async function addUser(uid, creds) {
  const userRef = doc(db, "users", uid);
  return await setDoc(userRef, creds);
}

export async function userExists(email) {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.length != 0;
}

export const getUserByUUID = async (uuid) => {
  try {
    // Construct the reference to the user document using the provided UUID
    const userRef = doc(db, "users", uuid);

    // Retrieve the user document
    const userSnapshot = await getDoc(userRef);

    // Check if the user document exists
    if (userSnapshot.exists()) {
      // Extract user data from the document
      const userData = userSnapshot.data();
      return userData;
    } else {
      // If the user document does not exist, return null or throw an error
      return null;
      // You can also throw an error like:
      // throw new Error('User not found');
    }
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user:", error);
    throw error;
  }
};

export const signup = async (creds) => {
  const { email, password, displayName } = creds;
  try {
    if (!email || !password || !displayName) {
      return {
        success: false,
        message: "Please enter your email address, password and display name.",
      };
    }

    // Signup the user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    const { uid } = userCredential.user;
    const user = {
      ...creds,
      uid,
      email,
      displayName,
      provider: "Email and Password",
    };

    // add the user to firestore
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, user);

    return {
      success: true,
      idToken: idToken,
    };
  } catch (error) {
    console.error(error);
    // If the user had been added to firebase auth, delete the user
    const user = await auth.currentUser;

    user && user.delete();

    return {
      success: false,
      message: error.message,
      error,
    };
  }
};
export { auth, db };
