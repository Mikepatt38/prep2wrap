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

export const getCurrentUser = () => 
  auth.currentUser