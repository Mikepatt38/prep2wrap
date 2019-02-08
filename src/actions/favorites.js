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
        currentFavorites.push(newFavorite)
        resolve(currentFavorites)
      })
    }
    catch (error) {
      reject(error)
    }
  })

  const currentUserFavorites = await getCurrentUsersFavorites

  dispatch(updateUserFavorites(currentUserId, currentUserFavorites))
  dispatch({
    type: 'SET_ALERT',
    payload: [true, 'Success', 'The user was added to your favorites list']
  })

}

// export const addUserToFavorite = (currentUserId, userToBeAdded) => async dispatch => {
//   const database = await db
//   let emptyArr = []
//   const getUsersFavorites = new Promise( (resolve, reject) => {
//     try {
//       database.collection("favorites").doc(currentUserId).get().then( (results) => {
//         results.exists ? resolve(results) : resolve(emptyArr)
//       })
//     }
//     catch(error) {
//       reject(error)
//     }
//   })

//   const userToBeAddedObj = {
//     id: userToBeAdded.id,
//     Name: userToBeAdded.firstName + ' ' + userToBeAdded.lastName,
//     Email: userToBeAdded.email
//   }

//   const favorites = await getUsersFavorites
//   console.log(favorites)
//   const updateFavorites = database.collection("favorites").doc(currentUserId).set({ favoritedUsers: [...favorites, userToBeAddedObj] })

//   updateFavorites 
//     .then(
//       dispatch({
//         type: 'SET_ALERT',
//         payload: [true, 'Success', 'The user was added to your favorites list']
//       })
//     )
// }