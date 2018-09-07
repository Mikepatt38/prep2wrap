import { db, auth } from '../db/firebase'

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

export const setUserProfile = (id, username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("users").doc(id).update({
    username, 
    location,
    headline,
    skills,
    fbLink,
    imdbLink,
    availability,
    travel,
    union,
    bilingual
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