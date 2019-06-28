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
const stripe = require('stripe')(functions.config().stripe.testkey)
// const currency = functions.config().stripe.currency || 'USD'

import { Storage } from '@google-cloud/storage'
const gcs = new Storage()

import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';
const nodemailer = require('nodemailer');
const cors = require('cors');

// ============ Resize a user's image when they upload an avatar to only save smaller images =========== //

// Call the cloud function whenever something is uploaded to the storage
export const generateThumbs = functions.storage
  .object()
  .onFinalize( async (object:any) => {   
    
    const filePath = object.name
    const fileName = filePath.split('/').pop() 
    const bucket = gcs.bucket(object.bucket)
    const bucketDir = dirname(filePath)

    // Prevents infinite loop by looking to see if we already created a resized image for the image
    if(fileName.includes('min_') || !object.contentType.includes('image')) {
      console.log('exiting function')
      return false
    }

    const userID = object.metadata.uid
    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, 'source.png')

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
      await bucket.upload(thumbPath, {
        destination: join(bucketDir, thumbName)
      })

      // Get the file path for the thumbnail URL
      // Get the Signed URLs for the thumbnail and original image.
      const thumbFile = bucket.file(thumbPath)
      const results = await Promise.all([
        thumbFile.getSignedUrl({
          action: 'read',
          expires: '03-01-2500',
        }),
      ])
      // TODO
      // Figure out where avatar URL is saving to
      // Add availability to dashboard
      // Redesign Dashboard
      // Send SMS text for every action as notification
      // Setup Email for Webhooks
      // Finish setting up all webhooks
      // Add trial period to Stripe Subscription charge to delay charge
      // ?? Add a way to update payment on user account settings ??
      await admin.firestore().collection('users').doc(userID).update({ 
        profileInformation: {
          avatarUrl: results[0]
        }
       })
    })

    // Run all actions async 
    await Promise.all(uploadPromises)

    // Remove the temp directory from the file system
    return fs.remove(workingDir)
  })

// ============ Deleting a user from Firestore DB and from Stripe as a customer =========== //

//
// This allows us to delete the user from stripe when they delete their account on the platform
//
export const deleteUserStripeAccount = async (user:any) => {
  const promises = []
  // get the user from the database
  const snapshot = await admin.firestore().collection('users').doc(user.uid).get();
  // grab the customer data so we know who to delete in stripe based on their customer id
  const customer = snapshot.data();
  // delete the user from stripe
  promises.push(stripe.customers.del(customer.stripe_id));
  return Promise.all(promises).then(() => user.uid);
  // return admin.firestore().collection('stripe_customers').doc(event.uid).delete();
}

//
// Clear Data function that uses the user id of the current deleted user to delete all
// found data from firestore, RTDB, and google cloud storage
//
exports.clearData = functions.auth.user().onDelete(async (event) => {
  const uid = event.uid;

  // const databasePromise = clearDatabaseData(uid);
  // const storagePromise = clearStorageData(uid);
  const firestorePromise = clearFirestoreData(uid);
  const stripePromise = deleteUserStripeAccount(event)

  return Promise.all([stripePromise, firestorePromise])
      .then(() => {
        console.log(`Successfully removed data for user #${uid}.`)
      }
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


// ========== Use a GMAIL account to send emails for updates on user accounts ========== //

// TODO: 
// Switch mailer over to sendgrid because google requires you to change security
// settings and stakeholders are not too thrilled about the aspect of doing that
//
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'mjpatt381@gmail.com',
      pass: 'aTt732MA16'
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
// export const sendMail = (emailData:any) => { 
  console.log('Starting outreach')
  cors(req, res, () => {
      console.log('passed cors')
      // getting dest email by query string
      const dest = req.body;
      console.log(req.body)
      const mailOptions = {
          from: 'Crew It Up Admin <mjpatt381@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'Test Email Submission', // email subject
          html: `<p>This is a test email. We will need to provide a template.</p>` 
      };
      console.log(mailOptions)

      // returning result
      return transporter.sendMail(mailOptions, (err:any, info:any) => {
          if(err){
              return res.send(err.toString());
          }
          return res.send('Sent');
      });
  });    
});
