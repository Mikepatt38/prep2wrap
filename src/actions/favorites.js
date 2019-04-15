import { db, auth } from '../db/firebase'

export const getUserFavorites = (user) => async dispatch => {
  dispatch({
    type: 'GET_USER_FAVORITES',
    payload: user.favorites 
  })
}

export const stopListeningForFavorites = (userId) => async () => {
  const database = await db
  database.collection("favorites").doc(userId).onSnapshot( () => {})
}

export const updateUserFavorites = (userID, usersFavorites) => async dispatch => {
  const database = await db

  database.collection("users").doc(userID).update({
    favorites: usersFavorites
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Your user favorites have been updated!']
    })
    dispatch({
      type: 'GET_USER_FAVORITES',
      payload: usersFavorites
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', 'ERROR: ' + error]   
    })
  })
}

// return an async callback function to workaround redux not being able to 
// use async functions as an action
export const getCurrentFavorites = (currentUserId) => async () => {
  const database = await db
  let currentFavorites = []

  currentFavorites = database.collection("users").doc(currentUserId).get().then( results => {
    return typeof results.data().favorites !== undefined ? results.data().favorites : []
  })

  return currentFavorites
}

export const addToUsersFavorites = (currentUserId, currentUserFavorites, userToBeAdded) => async dispatch => {
  const newFavorite = {
    id: userToBeAdded.id,
    name: userToBeAdded.firstName + ' ' + userToBeAdded.lastName,
    email: userToBeAdded.email,
    avatar: userToBeAdded.avatar ? userToBeAdded.avatar : "",
    location: userToBeAdded.profileInformation.location[0].value,
    numberOfTimesFavorite: userToBeAdded.numberOfTimesFavorite + 1
  }

  if(currentUserFavorites.length < 8) {
    currentUserFavorites.push(newFavorite)
    dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
    dispatch(updateTimesUserHasBeenFavorited(userToBeAdded.id, userToBeAdded.numberOfTimesFavorite, 'add'))
  }
  else {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Warning', 'You are allowed a max of 8 favorite users at once.']
    })
  }
}

export const updateTimesUserHasBeenFavorited = (userId, userNumberOfTimesFavorite, updateType) => async dispatch => {
  const database = await db 
  let newNumberOfTimesUserFavorite = updateType === 'add' ? userNumberOfTimesFavorite + 1 : userNumberOfTimesFavorite - 1 

  database.collection("users").doc(userId).update({
    numberOfTimesFavorite: newNumberOfTimesUserFavorite
  })
}

export const removeUserFromUserFavorites = (currentUserId, userToBeDeleted) => async dispatch => {
  const currentUserFavorites = await getCurrentFavorites(currentUserId)
  currentUserFavorites.filter(user => user.id === userToBeDeleted.id)
  dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
  console.log(userToBeDeleted)
  dispatch(updateTimesUserHasBeenFavorited(userToBeDeleted.id, userToBeDeleted.numberOfTimesFavorite, 'remove'))
}
