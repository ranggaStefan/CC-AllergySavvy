const foodModel = require("../service/foodDataLoad");
const { firestore } = require("../config/gcp");
const firebaseAdmin = require("../config/firebase");
const axios = require('axios');


const userRegister = async (req, h) => {
  try {
    const { email, password, username, is_alergic } = req.payload;
    
    // Create user in Firebase Authentication
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });

    await firestore.collection('users').doc(userRecord.uid).set({
      "email" : email,
      "username" : username,
      "is_alergic" : is_alergic,
    });

    return h
      .response({ message: "User registered successfully", userRecord })
      .code(200);
  } catch (error) {
    console.error("Error registering user:", error);
    return h
      .response({ message: "Failed to register user", error })
      .code(500);
  }
}

const userLogin = async (req, h) => {
  try {
    const { email, password } = req.payload;
    const firebaseApiKey = process.env.FIREBASE_API_KEY;

    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, localId } = response.data;
    // Generate authentication token
    const userSnapshot = await firestore.collection('users').doc(localId).get();

    if (!userSnapshot.exists) {
      return h.response({ message: 'User not found in Firestore' }).code(404);
    }

    const userData = userSnapshot.data();
    const { username, is_alergic } = userData;

    return h.response({ idToken, username, is_alergic }).code(200);
  } catch (error) {
    if (error.response.status === 400) return h.response({ message: 'Incorrect password' }).code(401);
    return h.response({ message: 'Failed to login user', error }).code(500);
  }
}

const getAllIngredient = async (req, h) => {
  try {
    const foods = await foodModel.getAllFoods();
    return h.response(foods).code(200);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports = { getAllIngredient, userRegister, userLogin };