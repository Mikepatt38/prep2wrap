import { db, auth } from '../db/firebase'
const collection = db.collection("users")

// User API
export const doCreateUser = (id, username, email) => 
  collection.doc(id).set({
    id: id,
    username: username,
    email: email,
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id)
  })
  .catch(function(error) {
    console.error("Error adding document: ", error)
  })


export const onceGetUsers = () =>
  db.collection("users").get()

// Get current user

export const getCurrentUserProfile = (id) => 
  db.collection("users").doc(id).get().then( (doc) => {
    if (doc.exists) {
        return doc.data()
    } else {
        console.log("No such user!");
    }
  }).catch(function(error) {
      console.log("Error getting user:", error);
  })

// Set user account settings

export const setUserAccountSettings = (id, name, email, headline, skills, fbLink, imdbLink) =>
  collection.doc(id).set({
    username: name,
    displayname: name,
    email,
    headline,
    skills,
    fbLink,
    imdbLink,
  }, { merge: true } )
  .then(function() {
    console.log("Document written with ID: ")
  })
  .catch(function(error) {
    console.error("Error adding document: ", error)
  })