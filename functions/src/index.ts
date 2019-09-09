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
const firestore = admin.firestore();
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp-promise');
const FieldValue = admin.firestore.FieldValue;
const stripe = require('stripe')(functions.config().stripe.testkey)
const endpointSecret = functions.config().keys.testsigning;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().keys.sendgrid);

// ============ Resize a user's image when they upload an avatar to only save smaller images =========== //

'use strict';

const spawn = require('child-process-promise').spawn;
const fs = require('fs');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports.generateThumbs = functions.storage.object().onFinalize(async (object) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image MIME type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `thumb_${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Prevents infinite loop by looking to see if we already created a resized image for the image
  if(fileName.includes('min_')) {
    console.log('exiting function')
    return false
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    return console.log('Already a Thumbnail.');
  }

  const userID = object.metadata!.uid

  // Cloud Storage files.
  const bucket = admin.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = {
    contentType: contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };
  
  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir)
  // Download file from bucket.
  await file.download({destination: tempLocalFile});
  console.log('The file has been downloaded to', tempLocalFile);
  // Generate a thumbnail using ImageMagick.
  await spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
  console.log('Thumbnail created at', tempLocalThumbFile);
  // Uploading the Thumbnail.
  await bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
  console.log('Thumbnail uploaded to Storage at', thumbFilePath);
  // Once the image has been uploaded delete the local files to free up disk space.
  fs.unlinkSync(tempLocalFile);
  fs.unlinkSync(tempLocalThumbFile);
  // Delete the original image from the storage
  await bucket.file(filePath).delete()
  // Get the Signed URLs for the thumbnail and original image.
  const config = {
    action: 'read',
    expires: '03-01-2500',
  };
  const results = await Promise.all([
    thumbFile.getSignedUrl(config),
  ]);
  const thumbResult = results[0];
  const thumbFileUrl = thumbResult[0];
  // Add the URLs to the Database
  await admin.firestore().collection('users').doc(userID).update({ 
    avatarUrl: thumbFileUrl
  })
  
  return console.log('Thumbnail URLs saved to database.');
});

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
// This sends an email via SendGrid to alert the user that their account has been deleted
//
export const sendDeleteEmail = async (user:any) => {
  const msg = {
    to: user.email,
    from: 'Prep2Wrap <info@prep2wrapjobs.com>',
    subject: 'Your Account Is Deleted',
    html: `<p>We hate to see you go.</p> <p>Thank you for being apart of the Prep2Wrap community. This email is confirming you have deleted your account and subscription with Prep2Wrap.</p>`,
  }
  sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch((error:any) => console.error(error.toString()))
}

//
// Clear Data function that uses the user id of the current deleted user to delete all
// found data from firestore, RTDB, and google cloud storage
//
exports.clearData = functions.auth.user().onDelete(async (event) => {
  const uid = event.uid;

  // const databasePromise = clearDatabaseData(uid);
  // const storagePromise = clearStorageData(uid);
  const stripePromise = deleteUserStripeAccount(event)
  const deleteEmail = sendDeleteEmail(event);
  const firestorePromise = clearFirestoreData(uid);

  return Promise.all([stripePromise, deleteEmail, firestorePromise])
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

// ========== Firebase Web-hook Endpoints ========== //

// ===========
//  We need to create a different case for each stripe event that will be called by this endpoint  
// =========== 

exports.stripeEvents = functions.https.onRequest( async (request, response) => {
  let sig = request.headers["stripe-signature"];

  try {
    let event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    switch (event!.type) {
      case 'customer.created':
        const msg = {
          to: event.data.object.email,
          from: 'Prep2Wrap <info@prep2wrapjobs.com>',
          subject: 'Welcome to Prep2Wrap',
          html: `<p>Hey ${event.data.object.name},</p> <p>Thank you for signing up for your account with Prep2Wrap. Log in to setup your account settings and begin hiring your next crew!</p>`,
        }
        sgMail
          .send(msg)
          .then(() => response.sendStatus(200))
          .catch((error:any) => console.error(error.toString()))
        break;

      case 'invoice.payment_succeeded':
        // What to do when the user pays another invoice -- we want to update the users next pay by date in the database
        const date = new Date()        
        // get the customer's id
        const customerInvoiceSuccessID = event.data.object.customer
        admin.firestore().collection('users').where('stripe_id', '==', customerInvoiceSuccessID).get().then ( (snapshot:any) => {
          snapshot.forEach( (doc:any) => {
            // update the users period end date to a month from now
            // also clear any failed payments they may have had
            admin.firestore().collection('users').doc(`${doc.data().id}`).update({ 
              current_period_end: new Date(date.getFullYear(), date.getMonth() + 1, date.getDay() + 3),
              failed_payment: false
            })
          })
        })
        .then( () => {
          // Then we want to send them an email saying they just paid their invoice for the month
          const invoiceMsg = {
            to: event.data.object.customer_email,
            from: 'Prep2Wrap <info@prep2wrapjobs.com>',
            subject: 'Prep2Wrap Invoice Paid',
            html: `<p>Hey ${event.data.object.customer_name},</p> <p>This is a notification to let you know you have paid your monthly invoice for Prep2Wrap.</p>
            <p>You can view the invoice here: <a href="${event.data.object.hosted_invoice_url}">Prep2Wrap Invoice</a>.</p>`,
          }
          sgMail
            .send(invoiceMsg)
            .then(() => response.sendStatus(200))
            .catch((error:any) => console.error(error.toString()))
        })
        break;

      case 'customer.subscription.trial_will_end':
        // Let the user know their trial will end soon and they will be charged
        // we first need to get the user's email that subscription is ending soon
        let userName = ''
        let userEmail = ''
        const trialEndDate = new Date(event.data.object.trial_end)
        const dateFromTimestamp = trialEndDate.toDateString()
        const customerSubscriptionTrialID = event.data.object.customer
        admin.firestore().collection('users').where('stripe_id', '==', customerSubscriptionTrialID).get().then ( (snapshot:any) => {
          // This is a loop but prevents error and only will ever be one user returned since searching on unique field
          snapshot.forEach( (doc:any) => {
            userEmail = doc.data().email
            userName = doc.data().firstName
          })
        })
        .then( () => {
          const subscriptionEndMsg = {
            to: userEmail,
            from: 'Prep2Wrap <info@prep2wrapjobs.com>',
            subject: 'Prep2Wrap Free Trial Ending Soon',
            html: `<p>Hey ${userName}, at ${userEmail}</p> <p>Your Prep2Wrap free trial will be ending on ${dateFromTimestamp} and you will be automatically moved to a monthly subscription at $15/month.</p> <p>If you do not wish to keep your account after your trial, log in to your account and delete your subscription.</p>`,
          }
          sgMail
            .send(subscriptionEndMsg)
            .then(() => response.sendStatus(200))
            .catch((error:any) => console.error(error.toString()))
        })
        break;

        case 'invoice.payment_failed':
          // What to do when the user pays another invoice -- we want to update the users next pay by date in the database
          const currentDate = new Date()   
          let failed_payments = false     
          const customerInvoiceFailedID = event.data.object.customer
          admin.firestore().collection('users').where('stripe_id', '==', customerInvoiceFailedID).get().then ( (snapshot:any) => {
            snapshot.forEach( (doc:any) => {
              // update the users period to 24 hours from now to give them a chance to update their card on file
              // add a failed payment to the user
              // if the user has a failed payment end their access to log in, if not, then grant them a grace period to update card on file
              failed_payments = doc.data().failed_payment
              admin.firestore().collection('users').doc(`${doc.data().id}`).update({ 
                current_period_end: failed_payments ? new Date() : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() + 3),
                failed_payment: true
              })
            })
          })
          .then( () => {
            // Then we want to send them an email saying their payment failed
            let invoiceFailedMsg = {}
            // if the user has a failed payment then send one message, if they do not have a failed payment then send another message
            if(failed_payments){
              invoiceFailedMsg = {
                to: event.data.object.customer_email,
                from: 'Prep2Wrap <info@prep2wrapjobs.com>',
                subject: 'Prep2Wrap Invoice Payment Failed',
                html: `<p>Hey ${event.data.object.customer_name},</p> <p>You did not update your card on file for your monthly subscription payment to Prep2Wrap and your account access has been blocked. Please email info@prep2wrapjobs.com for further instructions on how to get your account back online.</p>`,
              }
            }
            else {
              invoiceFailedMsg = {
                to: event.data.object.customer_email,
                from: 'Prep2Wrap <info@prep2wrapjobs.com>',
                subject: 'Prep2Wrap Invoice Payment Failed',
                html: `<p>Hey ${event.data.object.customer_name},</p> <p>We tried unsuccessfully several times to charge the card on your account for your monthly subscription to Prep2Wrap. We have given you a limited 24 hour access to your account to update your card on file. If the payment fails again after this time, we will block access to your account until the card is updated.</p>`,
              }
            }
            sgMail
              .send(invoiceFailedMsg)
              .then(() => response.sendStatus(200))
              .catch((error:any) => console.error(error.toString()))
          })
          break;

      default:
        // Unexpected event type
        return response.status(400).end();
    }
  } catch (err) {
    return response.status(400).send('error ' + err.message).end();
  }
});