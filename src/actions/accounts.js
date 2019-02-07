import { db, auth } from '../db/firebase'
import { storage } from '../db/firebase'

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

export const setUserProfile = (id, username, location, skills, positions, fbLink, imdbLink, availability, travel, union, bilingual, unions, languages) => async dispatch => {
  const database = await db
  const updateUserProfileSuccess = new Promise( (resolve, reject) => {
    try {
      database.collection("users").doc(id).update({
        profileInformation: {
          username, 
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
          avatar: url
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