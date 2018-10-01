import { db, auth } from '../db/firebase'
import { storage } from '../db/firebase'

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

export const uploadProfileImage = (id, filename) => async dispatch => {
  const ref = storage.ref()
  const file = filename
  const name = file.name + '-' + (+new Date())
  const database = await db
  const metadata = {
    contentType: file.type
  }

  const task  = ref.child(name).put(file, metadata)

  task
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

export const setProfileImage = (id, filename) =>  async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    avatar: filename
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
}