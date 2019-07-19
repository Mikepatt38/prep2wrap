import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyA_ldHlgixZ7fdxgEvC-82kb6P0-8GDaIk",
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939",
  appId: "1:48348373939:web:5302bb41aa61c483"
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