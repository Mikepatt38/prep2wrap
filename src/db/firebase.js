require('dotenv').config()

import firebase from 'firebase/app'
import 'firebase/auth'
  
// Initialize Firebase
var prodConfig = {
  apiKey: process.env.FIREBASE_KEY_DEV,
  authDomain: "the-calltime.firebaseapp.com",
  databaseURL: "https://the-calltime.firebaseio.com",
  projectId: "the-calltime",
  storageBucket: "the-calltime.appspot.com",
  messagingSenderId: "48348373939"
}

var devConfig = {
  apiKey: process.env.FIREBASE_KEY_PROD,
  authDomain: "the-calltime-production.firebaseapp.com",
  databaseURL: "https://the-calltime-production.firebaseio.com",
  projectId: "the-calltime-production",
  storageBucket: "",
  messagingSenderId: "1082183198566"
};
firebase.initializeApp(config);

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
  auth,
}