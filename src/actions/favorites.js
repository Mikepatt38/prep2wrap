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

export const getCurrentFavorites  = async (currentUserId) => {
  const database = await db
  let currentFavorites = []
  
  return new Promise( (resolve, reject) => {
    try {
      database.collection("users").doc(currentUserId).get().then( results => {
        currentFavorites = typeof results.data().favorites === undefined ? results.data().favorites : []
      })
      resolve(currentFavorites)
    }
    catch (error) {
      reject(error)
    }
  })
}

export const addToUsersFavorites = (currentUserId, userToBeAdded) => async dispatch => {
  const database = await db
  let currentFavorites = []

  const newFavorite = {
    id: userToBeAdded.id,
    name: userToBeAdded.firstName + ' ' + userToBeAdded.lastName,
    email: userToBeAdded.email,
    avatar: userToBeAdded.avatar ? userToBeAdded.avatar : ""
  }

  const currentUserFavorites = await getCurrentFavorites(currentUserId)
  if(currentUserFavorites.length < 8) {
    currentUserFavorites.push(newFavorite)
    dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
  }
  else {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Warning', 'You are allowed a max of 8 favorite users at once.']
    })
  }
}

export const removeUserFromUserFavorites = (currentUserId, userToBeDeletedId) => async dispatch => {
  const database = await db
  let currentFavorites = [] 

  const currentUserFavorites = await getCurrentFavorites(currentUserId)
  currentUserFavorites.filter(user => user.id === userToBeDeletedId)
  dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
}
