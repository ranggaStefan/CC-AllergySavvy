const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');

// const storage = new Storage({ keyFilename: '' });
const firestore = new Firestore({
  projectId: 'allergysavvy',
  databaseId: '(default)'
});

// const bucketName = 'your-gcp-bucket-name';
// const bucket = storage.bucket(bucketName);

module.exports = {
  // bucket,
  firestore
};