import firebase from 'firebase/app'
import 'firebase/auth'

require('dotenv').config()
  
// Initialize Firebase
// var prodConfig = {
//   apiKey: "process.env.FIREBASE_KEY_PROD",
//   authDomain: "the-calltime.firebaseapp.com",
//   databaseURL: "https://the-calltime.firebaseio.com",
//   projectId: "the-calltime",
//   storageBucket: "the-calltime.appspot.com",
//   messagingSenderId: "48348373939"
// }

var devConfig = {
  apiKey: process.env.FIREBASE_DEV_KEY,
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939"
};
//firebase.initializeApp(config);

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(devConfig)
}

const auth = firebase.auth()

export {
  auth,
}