const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('');

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebaseAdmin;