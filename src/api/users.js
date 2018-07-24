import { db, auth } from '../db/firebase'
const collection = db.collection("users")
const user = auth.currentUser

// User API
export const doCreateUser = (id, firstName, lastName, email) => 
  collection.doc(id).set({
    id: id,
    firstName: firstName,
    lastName: lastName,
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

export const setUserAccountSettings = (id, firstName, lastName, email, headline, skills, fbLink, imdbLink) =>
  collection.doc(id).set({
    firstName: firstName,
    lastName: lastName,
    displayName: firstName + ' ' + lastName,
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
export const updateUserData = (firstName, lastName) => 
  auth.currentUser.updateProfile({
    displayName: firstName + ' ' + lastName
  })

// User Search

let users = []

const firstNameSearch = (firstName) =>
  db.collection("users").where("firstName", "==", firstName)
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

  const lastNameSearch = (lastName) =>
    db.collection("users").where("lastName", "==", lastName)
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

let firstNameResults = []
let lastNameResults = []

export const userSearch = (firstName, lastName) => {
  let arr = []
  firstNameSearch(firstName)
    .then ( (results) => {
      firstNameResults = results
      lastNameSearch(lastName)
        .then( results => {
          lastNameResults = results
          arr = [
            ...firstNameResults,
            ...lastNameResults
          ]
          return arr
        })
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error)
    })
}
