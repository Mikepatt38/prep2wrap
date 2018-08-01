import { db } from '../db/firebase'
import { auth } from '../db'

export const signUserIn = (email, password, history) => dispatch => {
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

export const signUpUser = (email, password, firstName, lastName, history) => dispatch => {
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