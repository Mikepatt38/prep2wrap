import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

var devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939"
}

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939"
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