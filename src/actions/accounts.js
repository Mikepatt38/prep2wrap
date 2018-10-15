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



export const uploadProfileImage = (id, avatar, filename) => async dispatch => {
  const ref = storage.ref()
  console.log(ref)
  const file = filename
  const name = id
  const database = await db
  const metadata = {
    contentType: file.type
  }

  
  const deleted = new Promise( (resolve, reject) => {
    if(avatar) {
      console.log(ref.child(name))
      ref.child(name).delete().then(function() {
        console.log('deleted image')
        resolve(true)
      }).catch(function(error) {
        console.log(error + ' could not delete image')
        reject(false)
      })
    }
    resolve(true)
  })

  const success = await deleted

  const task  = ref.child(name).put(file, metadata)

  success && task
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

export const getFavorites = (userId) => async dispatch => {
  // const database = await db
  // let favorites = []

  // database.collection("favorites").doc(userId).get()
  //   .then( (doc) => {
  //     doc.exists ? console.log(doc.data().favoritedUsers) : []
  //   })

  // return favorites

  // database.collection("favorites").doc(userId).get()

  // try {
  //   database.collection("favorites").doc(userId).onSnapshot( (doc) => {
  //     doc.exists ? favorites = doc.data().favoritedUsers : console.log('No Favorites')
  //   })
  //   console.log(favorites)
  // }
  // catch (error) {
  //   console.log(error)
  // }
}

export const addUserToFavorite = (currentUserId, userToBeAdded, resolve) => async dispatch => {
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