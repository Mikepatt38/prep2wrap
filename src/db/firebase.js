import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  databaseURL: "YOUR_FIREBASE_DATABASE_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_ID",
  appId: "YOUR_FIREBASE_APP_ID"
})

const firestore = firebase.firestore()

// Initialize Cloud Firestore through Firebase
var db = firestore
const auth = firebase.auth()
var storage = firebase.storage()

export {
  db,
  auth,
  storage,
  firebase
}