/* eslint-disable require-jsdoc */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-empty */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const { onRequest } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const { default: axios } = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");

initializeApp();

const db = getFirestore();
const auth = getAuth();

const apiURL = "http://127.0.0.1:5001/spotify-9a74d/us-central1";

const spotifyApi = new SpotifyWebApi({
  clientId: "7e1ca92e581c4b5487cc1cd19eb64d46",
  redirectUri: `${apiURL}/callback`,
});

function sendResponse(res, success, data, message) {
  return res.json({ success, data, message });
}

function handleError(res, error, defaultMessage) {
  console.error(error);
  return sendResponse(res, false, null, error.message || defaultMessage);
}

exports.addUser = onRequest(async (req, res) => {
  try {
    const { user } = req.body;
    console.log(user);
    const userRef = db.collection("users").doc(user.uid);
    await userRef.set(user);
    return sendResponse(res, true, null, "User added.");
  } catch (error) {
    return handleError(res, error, "Error adding user.");
  }
});

exports.userExists = onRequest(async (req, res) => {
  try {
    const { email } = req.query;
    const usersRef = db.collection("users");
    const q = usersRef.where("email", "==", email);
    const querySnapshot = await q.get();

    const result = querySnapshot.docs.length != 0;

    return sendResponse(
      res,
      true,
      null,
      result ? "User exists." : "User does not exist."
    );
  } catch (error) {
    return handleError(res, error, "Error checking if user exists.");
  }
});

exports.getUserByUUID = onRequest(async (req, res) => {
  try {
    const { uuid } = req.query;
    const userRef = db.collection("users").doc(uuid);
    const userSnapshot = await userRef.get();
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return sendResponse(res, true, userData, "User retrieved.");
    } else {
      return sendResponse(res, false, null, "User not found.");
    }
  } catch (error) {
    return handleError(res, error, "Error retrieving user.");
  }
});

exports.signup = onRequest(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await auth.createUser({ email, password });
    const { uid, displayName, photoURL } = result;

    const user = {
      uid,
      email,
      displayName,
      photoURL,
      createdAt: result.metadata.creationTime,
      provider: "Email and Password",
    };

    await axios.post(`${apiURL}/addUser`, { body: { user } });

    return sendResponse(res, true, null, "User created.");
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});

exports.login = onRequest(async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const { user } = await auth.token;
    if (user) {
      return sendResponse(res, true, user, "User signed in.");
    } else {
      return sendResponse(res, false, null, "Invalid credentials.");
    }
  } catch (error) {
    return handleError(res, error, error.message);
  }
});
