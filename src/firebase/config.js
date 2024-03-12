import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import CryptoJS from "crypto-js";

const secret = import.meta.env.VITE_SOME_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyC5UMR3NXDTiP6g42fHPRM92f5nP2CWPzM",
  authDomain: "spotify-9a74d.firebaseapp.com",
  projectId: "spotify-9a74d",
  storageBucket: "spotify-9a74d.appspot.com",
  messagingSenderId: "934493280858",
  appId: "1:934493280858:web:7fb6d565ca5df775341663",
  measurementId: "G-L44DCMK533",
};

const firebaseApp = initializeApp(firebaseConfig);

// Access Firebase services using the namespaced API
const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

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

export { auth, db };
