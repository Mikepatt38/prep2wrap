import { db, auth } from '../db/firebase'
import { firebase } from '../db/firebase'

export const setAccountView = (view) => ({
  type: 'SET_ACCOUNT_VIEW',
  payload: view
})

export const setName = (id, firstName, lastName, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("users").doc(id).update({
    firstName,
    lastName
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
      payload: [true, 'error', 'ERROR: ' + error]   
    })
  })
}

export const setEmail = (id, email, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("users").doc(id).update({
    email
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

export const setUserProfile = (id, username, location, headline, skills, positions, fbLink, imdbLink, availability, travel, union, bilingual, unions, languages, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("users").doc(id).update({
    username, 
    location,
    headline,
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
}

export const uploadProfileImage = (filename) => async dispatch => {
  const ref = firebase.storage().ref
  const file = filename
  const name = file.name + '-' + (+new Date())
  const metadata = {
    contentType: file.type
  }

  const task  = ref.child(name).put(file, metadata)

  task
    .then( (snapshot) => { snapshot.ref.getDownloadURL() })
    .then( (url) => {
      console.log(url)
      dispatch({
        type: 'SET_PROFILE_IMAGE',
        payload: url  
      })
    })
    .catch(console.error)

}