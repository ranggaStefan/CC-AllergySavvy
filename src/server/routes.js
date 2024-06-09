const { getAllIngredient, getAllDataHandler } = require("../server/handler");
const { firestore } = require("../config/gcp");
const firebaseAdmin = require("../config/firebase");

const routes = [
  {
    method: "POST",
    path: "/api/v1/register",
    handler: async (req, h) => {
      try {
        const { email, password, displayName } = req.payload;

        // Create user in Firebase Authentication
        const userRecord = await firebaseAdmin.auth().createUser({
          email,
          password,
          displayName,
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
    },
  },
  {
    method: 'POST',
    path: '/api/v1/login',
    handler: async (req, h) => {
      try {
        const { email, password } = req.payload;

        // Generate authentication token
        const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
        const authToken = await firebaseAdmin.auth().createCustomToken(userRecord.uid);

        return h.response({ authToken }).code(200);
      } catch (error) {
        console.error('Error logging in user:', error);
        return h.response({ message: 'Failed to login user', error }).code(500);
      }
    }
  },
  {
    method: "GET",
    path: "/api/v1/ingredient",
    handler: getAllIngredient,
  },
  {
    method: "GET",
    path: "/test-firestore",
    handler: async (req, h) => {
      try {
        const testCollection = firestore.collection("ingredients");
        const snapshot = await testCollection.get();

        if (snapshot.empty) {
          return h
            .response({ message: "No documents found in Firestore" })
            .code(200);
        }

        let docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));

        return h
          .response({ message: "Firestore connected successfully", data: docs })
          .code(200);
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
        return h
          .response({ message: "Failed to connect to Firestore", error })
          .code(500);
      }
    },
  },
];

module.exports = routes;
