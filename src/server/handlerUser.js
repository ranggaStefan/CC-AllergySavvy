const { firestore } = require("../config/gcp");
const firebaseAdmin = require("../config/firebase");
const axios = require("axios");

const userRegister = async (req, h) => {
  try {
    const { email, password, username } = req.payload;

    if (!username) {
      throw new Error("Username is required.");
    }

    // Create user in Firebase Authentication
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });

    await firestore.collection("users").doc(userRecord.uid).set({
      email: email,
      username: username,
      user_allergies: null,
      bio: null,
    });

    return h
      .response({ status: "Created", message: "User registered successfully", email: email })
      .code(201);
  } catch (error) {
    return h.response({ status: "fail" ,message: "Failed to register user", error }).code(400);
  }
};

const userLogin = async (req, h) => {
  try {
    const { email, password } = req.payload;
    const firebaseApiKey = process.env.FIREBASE_API_KEY;

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, localId } = response.data;

    const userSnapshot = await firestore.collection("users").doc(localId).get();

    if (!userSnapshot.exists) {
      return h.response({ message: "User not found in Firestore" }).code(404);
    }

    const userData = userSnapshot.data();
    const { username } = userData;

    return h
      .response({
        status: "OK",
        message: "Log in Successful",
        token: idToken,
        data: {
          email: email,
          username: username,
        },
      })
      .code(200)
      .header("Content-Type", "application/json");
  } catch (error) {
    if (error.response.status === 400)
      return h.response({ message: "Incorrect password" }).code(401);
    return h.response({ message: "Failed to login user", error }).code(500);
  }
};

const getUserData = async (req, h) => {
  try {
    const uid = req.user.uid;

    const userDoc = await firestore.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return h.response({ message: "User not found" }).code(404);
    }

    const { email, username, user_allergies, bio } = userDoc.data();

    return h
      .response({
        status: "OK",
        message: "Response Success",
        data: {
          email,
          username,
          user_allergies,
          bio,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Error getting user data:", error);
    return h.response({ message: "Failed to get user data", error }).code(500);
  }
};

const updateUserData = async (req, h) => {
  try {

  } catch {

  }
};

const setUserAllergies = async (req, h) => {
  try {
    const { user_allergies } = req.payload;
    const uid = req.user.uid;

    const allergies = user_allergies

    await firestore.collection("users").doc(uid).update({ 
      user_allergies: allergies 
    });

    return h
      .response({
        status: "OK",
        message: "Allergies added to user",
      })
      .code(200);
  } catch (error) {
    console.error("Error getting user data:", error);
    return h.response({ message: "Failed to get user data", error }).code(500);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserData,
  updateUserData,
  setUserAllergies,
};
