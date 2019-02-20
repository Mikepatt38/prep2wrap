import { db } from '../db/firebase'
import { auth } from '../db'

export const clearSearchUserByNameResults = () => ({type: 'CLEAR_SEARCH_USER_BY_NAME_RESULTS', payload: [] })

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

export const signUpUser = (email, password, firstName, lastName, mobileNumber) => async dispatch => {
  const signUpUserSuccess = new Promise( (resolve, reject) => {
    try {
      auth.doCreateUserWithEmailAndPassword(email, password)
      .then( async (authUser) => {
        const database = await db
        database.collection("users").doc(authUser.user.uid.toString()).set({
          id: authUser.user.uid.toString(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
          numberOfTimesFavorite: 0
        })
        resolve('success')
      })
    }
    catch(error) {
      reject('error')
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', error]   
      })
    }
  })
  return await signUpUserSuccess
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
}

export const searchUsersByName = (firstName, lastName) => async dispatch => {
  const database = await db
  let users = []
  const returnUserSearchResults = new Promise( (resolve, reject) => {
    try {
      database.collection("users").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
          console.log('firstName: ' + doc.data().firstName + ' Given firstName: ' + firstName)
          console.log('Do firstName match? ' + firstName.includes(doc.data().firstName))
          firstName.toLowerCase().includes(doc.data().firstName.toLowerCase()) || lastName.toLowerCase().includes(doc.data().lastName.toLowerCase()) ? users.push(doc.data()) : null
        })
      })
      .then( () => {
        resolve(users)
      })
    }
    catch(error) {
      reject('error')
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', error]   
      })
    }
  }) 
  const usersArr = await returnUserSearchResults
  await dispatch({
      type: 'SEARCH_USER_BY_NAME_RESULTS',
      payload: usersArr
    })
}
