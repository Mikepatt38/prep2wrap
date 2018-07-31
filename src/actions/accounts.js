import { db, auth } from '../db/firebase'

export const setName = (firstName, lastName) => dispatch => {
  auth.currentUser.updateProfile({
    displayName: firstName + ' ' + lastName
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'User Name Updated']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', 'ERROR: User Name Not Updated']   
    })
  })
}

export const setEmail = (id, email) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).set({
    email
  }, { merge: true })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'User Email Updated']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', "ERROR: User Email Not Updated"]   
    })
  })
}

export const setUserProfile = (id, username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).set({
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
  }, { merge: true })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'User Profile Updated']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', "ERROR: User Profile Not Updated"]   
    })
  })
}