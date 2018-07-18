import { db, auth } from '../db/firebase'
const collection = db.collection("users")
const user = auth.currentUser

// User API
export const doCreateUser = (id, username, email) => 
  collection.doc(id).set({
    id: id,
    username: username,
    email: email,
  })
  .then( () => {
    console.log("Document written with ID: ")
  })
  .catch(function(error) {
    console.error("Error adding document: ", error)
  })


export const onceGetUsers = () =>
  db.collection("users").get()

  // api.onceGetUsers().then( (querySnapshot) => {
  //   querySnapshot.forEach( (doc) => {
  //     this.setState({
  //       users: [...this.state.users, doc.data()]
  //     })
  //   })
  // })

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
    displayName: name,
    email,
    headline,
    skills,
    fbLink,
    imdbLink,
  }, { merge: true } )
  .then( () => {
    console.log("Document written with ID: ")
    return "SUCCESS: User Account Settings Updated"
  })
  .catch(function(error) {
    console.error("Error adding document: ", error)
    return "ERROR: User Account Settings Was Not Updated"
  })

// Update Firebase user table
export const updateUserData = (displayName) => 
  auth.currentUser.updateProfile({
    displayName
  })

// User Search

let users = []

export const userSearch = (name) =>
  db.collection("users").where("username", "==", name)
    .get()
    .then( (querySnapshot) => {
        querySnapshot.docs.length !== 0
        ? querySnapshot.forEach(function(doc) {
          users = []
          users.push(doc.data())
        })
        : users = []
        return users
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    })