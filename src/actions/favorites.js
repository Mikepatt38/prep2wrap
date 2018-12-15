import { db, auth } from '../db/firebase'

export const getUserFavorites = (userId) => async dispatch => {
  const database = await db
  database.collection("favorites").doc(userId).onSnapshot( (doc) => {
    if (doc.exists) {
      return doc.data().favoritedUsers,
      dispatch({
        type: 'GET_USER_FAVORITES',
        payload: doc.data().favoritedUsers 
      })
    }
    else {
      console.log("There are no favorites")
      dispatch({
        type: 'GET_USER_FAVORITES',
        payload: []  
      })
    }
  }) 
}

export const stopListeningForFavorites = (userId) => async () => {
  const database = await db
  database.collection("favorites").doc(userId).onSnapshot( () => {})
}

export const addUserToFavorite = (currentUserId, userToBeAdded) => async dispatch => {
  const database = await db
  let emptyArr = []
  const getUsersFavorites = new Promise( (resolve, reject) => {
    try {
      database.collection("favorites").doc(currentUserId).get().then( (results) => {
        results.exists ? resolve(results) : resolve(emptyArr)
      })
    }
    catch(error) {
      reject(error)
    }
  })

  const userToBeAddedObj = {
    id: userToBeAdded.id,
    Name: userToBeAdded.firstName + ' ' + userToBeAdded.lastName,
    Email: userToBeAdded.email
  }

  const favorites = await getUsersFavorites
  console.log(favorites)
  const updateFavorites = database.collection("favorites").doc(currentUserId).set({ favoritedUsers: [...favorites, userToBeAddedObj] })

  updateFavorites 
}