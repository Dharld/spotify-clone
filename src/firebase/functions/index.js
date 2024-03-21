/* eslint-disable new-cap */
/* eslint-disable quote-props */
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
const admin = require("firebase-admin");
const { default: axios } = require("axios");
const serviceAccount = require("./config.json");
const jwt = require("jsonwebtoken");

const SpotifyWebApi = require("spotify-web-api-node");

// Initialize the firebase admin sdk
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// Initialize the firestore database
const db = admin.firestore();
const settings = { host: "localhost:8080", ssl: false };
db.settings(settings);

// Auth can't use the local emulators
const auth = admin.auth();

const apiURL = "http://127.0.0.1:5001/spotify-9a74d/us-central1";

const clientId = "7e1ca92e581c4b5487cc1cd19eb64d46";
const clientSecret = "5e344fc03dc046d6936f668ceac5b23c";
const redirectUri = `${apiURL}/callback`;

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

function sendResponse(res, success, data, message) {
  return res.json({ success, data, message });
}

function handleError(res, error, defaultMessage) {
  console.error(error);
  return sendResponse(res, false, null, error.message || defaultMessage);
}

const addUser = async (user) => {
  const userRef = db.collection("users").doc(user.uid);
  await userRef.set(user);
};

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
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return handleError(res, new Error("Please provide all the credentials"));
    }

    // Signup the user
    const userRecord = await auth.createUser({ email, password });
    const { uid } = userRecord;

    const user = {
      uid,
      email,
      displayName,
      createdAt: userRecord.metadata.creationTime,
      provider: "Email and Password",
    };

    // Create a custom token
    const customToken = jwt.sign({ uid }, clientSecret);

    // add the user to firestore
    await addUser(user);

    return sendResponse(
      res,
      true,
      { token: customToken },
      "User created successfully."
    );
  } catch (error) {
    console.error(error);

    // If the user had been added to firebase auth, delete the user
    const userRecord = await auth.getUserByEmail(req.body.email);
    if (userRecord) {
      await admin.auth().deleteUser(userRecord.uid);
    }

    res.json({
      success: false,
      message: "Error creating user",
    });
  }
});

exports.login = onRequest(async (req, res) => {
  try {
    const { token, email, password } = req.body;
    if (token) {
      const decodedToken = await jwt.verify(token, clientSecret);
      const user = await auth.getUser(decodedToken.uid);
      if (user) {
        return sendResponse(res, true, user, "User signed in successfully!");
      }
    }
    if (user) {
      // We keep the spotify token in the user object
      const spotifyAccessToken = spotifyApi.getAccessToken();
      const userRef = db.collection("users").doc(user.uid);
      await userRef.update({ spotifyToken: spotifyAccessToken });
      return sendResponse(res, true, user, "User signed in.");
    } else {
      return sendResponse(res, false, null, "Invalid credentials.");
    }
  } catch (error) {
    return handleError(res, error, error.message);
  }
});

exports.authorizeSpotify = onRequest(async (req, res) => {
  try {
    const state = req.query.token;
    const authorizeURL = spotifyApi.createAuthorizeURL([], state);
    return res.redirect(authorizeURL);
  } catch (err) {
    console.error(err);
    handleError(res, err, "Error logging in with Spotify.");
  }
});

exports.callback = onRequest(async (req, res) => {
  try {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      return sendResponse(res, false, null, "Invalid state.");
    } else {
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        json: true,
      };
      const call = axios.post(authOptions.url, authOptions.form, {
        headers: authOptions.headers,
      });

      const data = await call.then((response) => response.data);

      spotifyApi.setAccessToken(data.access_token);
      spotifyApi.setRefreshToken(data.refresh_token);

      return res.redirect(`${apiURL}/login?token=${state}`);
    }
  } catch (err) {
    console.error(err);
    handleError(res, err, "Error logging in with Spotify.");
  }
});

exports.refreshSpotifyToken = onRequest(async (req, res) => {
  try {
    const token = await spotifyApi
      .refreshAccessToken()
      .then((data) => data.access_token);
    spotifyApi.setAccessToken(token);
    return sendResponse(res, true, token, "Spotify token refreshed.");
  } catch (err) {
    console.error(err);
    handleError(res, err, "Error refreshing Spotify token.");
  }
});
