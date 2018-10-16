import { db, auth } from '../db/firebase'

export const getFavorites = (userId) => async dispatch => {
  // const database = await db
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
  const updateFavorites = database.collection("favorites").doc(currentUserId).set({ favoritedUsers: [...favorites, userToBeAddedObj] })

  updateFavorites 
}