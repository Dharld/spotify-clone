/* eslint-disable linebreak-style */
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

const cors = require("cors")({ origin: true });

// Initialize the firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spotify-9a74d.firebaseio.com",
});

// Initialize the firestore database
const db = admin.firestore();

// Auth can't use the local emulators
const auth = admin.auth();

const apiURL = "http://127.0.0.1:5001/spotify-9a74d/us-central1";
const jwtSecret = "fd1gfh48q+9/*dfnjdafa_'çàpadfnquialmbopuatn";
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

/* const addUser = async (user) => {
  const userRef = db.collection("users").doc(user.uid);
  await userRef.set(user);
}; */

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
    if (userSnapshot.exists) {
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
  const { email, password, displayName, dob, gender } = req.body;
  try {
    if (!email || !password || !displayName) {
      return handleError(res, false, "Please enter all the credentials");
    }

    const userRecord = await auth.createUser({
      email,
      emailVerified: false,
      displayName,
    });

    const { uid } = userRecord;

    const storedUser = {
      email,
      password,
      displayName,
      dob,
      uid,
      provider: "Email and Password",
      createdAt: new Date(),
      gender,
    };

    const docRef = db.collection("users").doc(uid);
    await docRef.set(storedUser);

    const token = jwt.sign({ uid }, jwtSecret);
    return sendResponse(res, true, { token }, "User created successfully.");
  } catch (error) {
    console.error(error);

    const user = await auth.currentUser;

    user && (await user.delete());

    return handleError(res, error);
  }
});

exports.login = onRequest(async (req, res) => {
  cors(req, res, async () => {
    let returnedToken;
    try {
      const { token, email, password } = req.body;
      let user;
      if (token) {
        const decodedToken = jwt.verify(token, jwtSecret);
        // Use the token to retrieve the user from firestore
        const { uid } = decodedToken;
        const userRef = db.collection("users").doc(uid);
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
          user = userSnapshot.data();
          returnedToken = token;
        } else {
          return handleError(res, new Error("User not found."));
        }
      } else {
        if (!email || !password) {
          return handleError(
            res,
            new Error("Please provide all the credentials")
          );
        }
        console.log("here");
        const querySnapshot = await db
          .collection("users")
          .where("email", "==", email)
          .get();

        if (querySnapshot.docs.length === 0) {
          return handleError(
            res,
            new Error("There's no user with this email.")
          );
        } else {
          user = querySnapshot.docs[0].data();
          if (user.password !== password) {
            return handleError(res, new Error("Invalid credentials"));
          } else {
            returnedToken = jwt.sign({ uid: user.uid }, jwtSecret);
          }
        }
      }
      if (user) {
        return sendResponse(
          res,
          true,
          { user, token: returnedToken },
          "User signed in."
        );
      } else {
        return handleError(res, new Error("Invalid credentials"));
      }
    } catch (error) {
      return handleError(res, error);
    }
  });
});

exports.authorizeSpotify = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const state = req.query.token;
      const scopes = ["user-read-recently-played"];
      const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
      return res.redirect(authorizeURL);
    } catch (err) {
      console.error(err);
      handleError(res, err, "Error logging in with Spotify.");
    }
  });
});

exports.callback = onRequest(async (req, res) => {
  cors(req, res, async () => {
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

        return res.redirect(
          `http://localhost:5173/login?spotifyToken=${data.access_token}`
        );
      }
    } catch (err) {
      console.error(err);
      handleError(res, err, "Error logging in with Spotify.");
    }
  });
});

exports.refreshSpotifyToken = onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      const token = await spotifyApi
        .refreshAccessToken()
        .then((data) => data.access_token);
      spotifyApi.setAccessToken(token);
      return sendResponse(res, true, token, "Spotify token refreshed.");
    });
  } catch (err) {
    console.error(err);
    handleError(res, err, "Error refreshing Spotify token.");
  }
});

exports.getRecentlyPlayedTracks = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { limit, token } = req.query;
    try {
      spotifyApi.setAccessToken(token);
      const response = await spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: limit || 6,
        })
        .then((res) => res.body);
      const recentlyPlayed = response.items;
      return sendResponse(
        res,
        true,
        recentlyPlayed,
        "Recently played items retrieved."
      );
    } catch (error) {
      if (error.statusCode === 401) {
        const response = await spotifyApi
          .getMyRecentlyPlayedTracks({
            limit: limit || 6,
          })
          .then((res) => res.body);
        const recentlyPlayed = response.items;
        return sendResponse(
          res,
          true,
          recentlyPlayed,
          "Recently played items retrieved."
        );
      }
      return handleError(res, error, "Error retrieving recently played items.");
    }
  });
});

exports.getFeaturedPlaylists = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { limit = 21, token } = req.query;
    try {
      spotifyApi.setAccessToken(token);
      const response = await spotifyApi
        .getFeaturedPlaylists()
        .then((res) => res.body);
      console.log(response);
      return sendResponse(res, true, response, "Featured Playlists retrieved.");
    } catch (err) {
      console.error(err);
      handleError(res, err, "Error retrieving featured playlists");
    }
  });
});
