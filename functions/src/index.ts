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
const stripe = require('stripe')(functions.config().stripe.testkey)
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

  // When a user is created, register them with Stripe
  export const createStripeCustomer = functions.auth.user().onCreate(async (user) => {
    // Create the customer with Stripe, get a callback for the customer from Stripe
    const customer = await stripe.customers.create({email: user.email});
    // Add the customer's Stripe customer ID to the database to use for later
    return admin.firestore().collection('users').doc(user.uid).update({stripe_id: customer.id});
  });
