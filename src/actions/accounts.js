import { db, auth } from '../db/firebase'
import { storage } from '../db/firebase'

export const setAccountView = (view) => ({
  type: 'SET_ACCOUNT_VIEW',
  payload: view
})

export const setName = (id, firstName, lastName) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    firstName,
    lastName
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
    email,
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
    mobileNumber
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

export const setUserProfile = (id, username, location, skills, positions, fbLink, imdbLink, availability, travel, union, bilingual, unions, languages, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("users").doc(id).update({
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
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'SUCCESS: Your public profile information was updated.']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', error]   
    })
  })
}

export const uploadProfileImage = (id, avatar, filename) => async dispatch => {
  const ref = storage.ref()
  console.log(ref)
  const file = filename
  const name = id
  const database = await db
  const metadata = {
    contentType: file.type
  }

  const deleted = new Promise( (resolve, reject) => {
    if(avatar) {
      console.log(ref.child(name))
      ref.child(name).delete().then(function() {
        console.log('deleted image')
        resolve(true)
      }).catch(function(error) {
        console.log(error + ' could not delete image')
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
        avatar: url
      })
      .then( () => {
        console.log('success')
        dispatch({
          type: 'ON_MODAL_SUCCESS',
          payload: [true, false]
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