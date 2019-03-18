import { db } from '../db/firebase'
import { auth } from '../db'
import { storage } from '../db/firebase'

export const clearSearchUserByNameResults = () => ({type: 'CLEAR_SEARCH_USER_BY_NAME_RESULTS', payload: [] })

export const signUserIn = (email, password, history, e) => dispatch => {
  e.preventDefault()
  auth.doSignInWithEmailAndPassword(email, password)
    .then( () => {
      history.push("/")
    })
    .catch(error => {
      const errorMsg = error.code === 'auth/user-not-found' ? 'No user was found with that email address.' : 'The provided password is not valid for that email account.'
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Error', errorMsg]   
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
}

export const searchUsersByName = (firstName, lastName) => async dispatch => {
  const database = await db
  let users = []
  const returnUserSearchResults = new Promise( (resolve, reject) => {
    try {
      database.collection("users").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
          return firstName.toLowerCase().includes(doc.data().firstName.toLowerCase()) || lastName.toLowerCase().includes(doc.data().lastName.toLowerCase()) ? users.push(doc.data()) : null
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


export const setAccountView = (view) => ({
  type: 'SET_ACCOUNT_VIEW',
  payload: view
})

export const setName = (id, firstName, lastName) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      firstName,
      lastName
    }
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'SUCCESS: Your basic account information was updated.']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', 'ERROR: ' + error]   
    })
  })
}

export const setEmail = (id, email) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      email
    }
  })
  .then( () => {
    dispatch({
      type: 'ON_MODAL_SUCCESS',
      payload: [true, false]
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', "ERROR: " + error]   
    })
  })
}

export const setMobileNumber = (id, mobileNumber) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      mobileNumber
    }
  })
  .then( () => {
    dispatch({
      type: 'ON_MODAL_SUCCESS',
      payload: [true, false]
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', "ERROR: " + error]   
    })
  })
}

export const setUserProfile = (id, jobTypes, location, skills, positions, fbLink, imdbLink, availability, travel, union, bilingual, unions, languages) => async dispatch => {
  const database = await db
  const updateUserProfileSuccess = new Promise( (resolve, reject) => {
    try {
      database.collection("users").doc(id).update({
        profileInformation: {
          jobTypes, 
          location,
          skills,
          positions,
          fbLink,
          imdbLink,
          availability,
          travel,
          union,
          bilingual,
          unions, 
          languages
        }
      })
      .then( () => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'success', 'SUCCESS: Your public profile information was updated.']
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
  return await updateUserProfileSuccess
}

export const uploadProfileImage = (id, avatar, filename) => async dispatch => {
  const ref = storage.ref()
  const file = filename
  const name = id
  const database = await db
  const metadata = {
    contentType: file.type
  }

  const deleted = new Promise( (resolve, reject) => {
    if(avatar) {
      ref.child(name).delete().then(function() {
        resolve(true)
      }).catch(function(error) {
        reject(false)
      })
    }
    resolve(true)
  })

  const success = await deleted

  const task  = ref.child(name).put(file, metadata)

  success && task
    .then( (snapshot) => snapshot.ref.getDownloadURL() )
    .then( (url) => {
      database.collection("users").doc(id).update({
        profileInformation: {
          avatarUrl: url
        }
      })
      .then( () => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'success', 'SUCCESS: Your public avatar image has been updated.']
        })
      })
      .catch( (error) => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'error', error]   
        })
      })
    })
    .catch(console.error)
}

// Async actions and functions that call them to interact with Firebase Firestore and then user facing client
export const signUpUser = (email, password, firstName, lastName, mobileNumber, history) => async dispatch => {
  const database = await db

  try {
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then( (authUser) => {
        database.collection("users").doc(authUser.user.uid.toString()).set({
          id: authUser.user.uid.toString(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
        })
      })
      .then( () => {
        history.push("/")
      })
      .catch( error => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'Error', error.message]   
        })
        return 'error'
      })
  }
  catch(error) {
    return error
  }
}