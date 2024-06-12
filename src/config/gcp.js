const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'allergysavvy',
  databaseId: '(default)'
});

module.exports = {
  // bucket,
  firestore
};