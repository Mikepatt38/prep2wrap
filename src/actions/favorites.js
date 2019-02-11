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
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', 'ERROR: ' + error]   
    })
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

  const getCurrentUsersFavorites = new Promise( (resolve, reject) => {
    try {
      database.collection("users").doc(currentUserId).get().then( results => {
        currentFavorites = typeof results.data().favorites === undefined ? results.data().favorites : []
      })
      .then ( () => {
        if(currentFavorites.length < 8) {
          currentFavorites.push(newFavorite)
          resolve(currentFavorites)
        }
      })
    }
    catch (error) {
      reject(error)
    }
  })

  const currentUserFavorites = await getCurrentUsersFavorites

  if(currentFavorites.length > 8) {
    dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
  }
  else {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Warning', 'You are allowed a max of 8 favorite users at once.']
    })
  }

}
