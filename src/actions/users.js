import { db } from '../db/firebase'
import { auth } from '../db'

export const signUserIn = (email, password, history, e) => dispatch => {
  e.preventDefault()
  auth.doSignInWithEmailAndPassword(email, password)
    .then( () => {
      history.push("/dashboard")
    })
    .catch(error => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', error]   
      })
    })
}

export const signUpUser = (email, password, firstName, lastName, history, e) => dispatch => {
  e.preventDefault()
  auth.doCreateUserWithEmailAndPassword(email, password)
    .then( async (authUser) => {
      const database = await db
      database.collection("users").doc(authUser.user.uid.toString()).set({
        id: authUser.user.uid.toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then ( () => {
        dispatch({
          type: 'SET_ACCOUNT_VIEW',
          payload: 'profile'  
        })
        history.push("/account-settings")
      })
      .catch(error => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'error', error]   
        })
      })
    })
    .catch(error => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', error]   
      })
    })
}

export const resetPassword = (email, e) => async dispatch => {
  e.preventDefault()
  auth.doPasswordReset(email)
  .then(() => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'Your Password Reset Link Was Sent']   
    })
  })
  .catch(error => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', error]   
    })
  })
}

export const removeCurrentUser = () => ({
  type: 'REMOVE_CURRENT_USER',
  payload: null
})

export const getCurrentUser = (id) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).onSnapshot( (doc) => {
    if (doc.exists) {
      dispatch({
        type: 'SET_CURRENT_USER',
        payload: doc.data()   
      })
    } else {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', 'ERROR: Something Went Wrong']   
      })
    }
  })
  // .catch(function(error) {
  //   dispatch({
  //     type: 'SET_ALERT',
  //     payload: [true, 'error', error]   
  //   })
  // })
}

export const searchUsersByName = (searchTerm, e) => async dispatch => {
  // e.preventDefault()
  const database = await db
  let users = []
  database.collection("users").get().then( (querySnapshot) => {
    querySnapshot.forEach( (doc) => {
      searchTerm.includes(doc.data().firstName) || searchTerm.includes(doc.data().lastName) ? users.push(doc.data()) : null
    })
    dispatch({
      type: 'SEARCH_USER_BY_NAME_RESULTS',
      payload: users
    })
  }).catch(function(error) {
    console.log("Error getting document:", error)
  })
}