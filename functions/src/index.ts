import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp({
  apiKey: functions.config().app.key,
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939"
});
const userPrivacyPaths = require('./user_privacy.json');
// const db = admin.database();
const firestore = admin.firestore();
// const storage = admin.storage();
const FieldValue = admin.firestore.FieldValue;
// const stripe = require('stripe')(functions.config().stripe.testkey)
// const currency = functions.config().stripe.currency || 'USD'

import { Storage } from '@google-cloud/storage'
const gcs = new Storage()

import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

// Call the cloud function whenever something is uploaded to the storage
export const generateThumbs = functions.storage
  .object()
  .onFinalize( async (object:any) => {
    const bucket = gcs.bucket(object.bucket)
    const filePath = object.name
    const fileName = filePath.split('/').pop()
    const bucketDir = dirname(filePath)

    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, 'source.png')

    // Prevents infinite loop by looking to see if we already created a resized image for the image
    if(fileName.includes('thumb@') || !object.contentType.includes('image')) {
      console.log('exiting function')
      return false
    }

    // Ensures that the directory exist
    await fs.ensureDir(workingDir)

    // Get the image that was uploaded to the Firebase storage
    await bucket.file(filePath).download({
      destination: tmpFilePath
    })

    // The sizes that we want to readjust the image to
    const sizes = [64]

    // The actions we want to take, Create the name and add it to the directory for the resized image
    const uploadPromises = sizes.map( async size => {
      const thumbName = `min_${fileName}`
      const thumbPath = join(workingDir, thumbName)

      // Actually resize the image in the temp directory we just added it to
      await sharp(tmpFilePath)
        .resize(size, size)
        .toFile(thumbPath)

      
      // Deletes the original image that was uploaded
      await bucket.file(filePath).delete()

      // Upload the new directory to the storage with only the resized image of the uploaded one
      return bucket.upload(thumbPath, {
        destination: join(bucketDir, thumbName)
      })
    })

    // Run all actions async 
    await Promise.all(uploadPromises)

    // Remove the temp directory from the file system
    return fs.remove(workingDir)
  })

// We want to delete all user data from firestore database and storage when the user 
// deletes their account using the firebase auth delete

//
// Clear Data function that uses the user id of the current deleted user to delete all
// found data from firestore, RTDB, and google cloud storage
//
exports.clearData = functions.auth.user().onDelete((event) => {
  const uid = event.uid;

  // const databasePromise = clearDatabaseData(uid);
  // const storagePromise = clearStorageData(uid);
  const firestorePromise = clearFirestoreData(uid);

  return Promise.all([firestorePromise])
      .then(() => console.log(`Successfully removed data for user #${uid}.`)
  );
});

//
// Function to replace the UID_VARIABLE placeholder in user_privacy.json
// file with the actual user id 
//
const replaceUID = (str:any, uid:any) => {
  return str.replace(/UID_VARIABLE/g, uid);
}
//
// Function to delete all user data from the firestore database
//
// Clears all specified paths in the user_privacy.json file
// Loops through until all fields have been deleted then final else if
// deletes the parent document
export const clearFirestoreData = (uid:any) => {
  const paths = userPrivacyPaths.firestore.clearData;
  const promises = [];

  for (let i = 0; i < paths.length; i++) {
    const entry = paths[i];
    const entryCollection = replaceUID(entry.collection, uid);
    const entryDoc = replaceUID(entry.doc, uid);
    const docToDelete = firestore.collection(entryCollection).doc(entryDoc);
    if ('field' in entry) {
      const entryField = replaceUID(entry.field, uid);
      const update = {} as any
      update[entryField] = FieldValue.delete()
      promises.push(docToDelete.update(update).catch((err:any) => {
        console.error('Error deleting field: ', err);
      }));
    } else if (docToDelete) {
      promises.push(docToDelete.delete().catch((err:any) => {
        console.error('Error deleting document: ', err);
      }));
    };
  };

  return Promise.all(promises).then(() => uid);
};
