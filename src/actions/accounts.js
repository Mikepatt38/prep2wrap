import { db } from '../db/firebase'
import { auth } from '../db'
import { storage } from '../db/firebase'

export const clearSearchUserByNameResults = () => ({type: 'CLEAR_SEARCH_USER_BY_NAME_RESULTS', payload: [] })

export const signUserIn = (email, password, history, e) => dispatch => {
  e.preventDefault()
  auth.doSignInWithEmailAndPassword(email, password)
    .then( () => {
      history.push("/")
    })
    .catch(error => {
      const errorMsg = error.code === 'auth/user-not-found' ? 'No user was found with that email address.' : 'The provided password is not valid for that email account.'
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Error', errorMsg]   
      })
    })
}

export const resetPassword = (email, e) => async dispatch => {
  e.preventDefault()
  auth.doPasswordReset(email)
  .then(() => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'Your Password Reset Link Was Sent']   
    })
  })
  .catch(error => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', error]   
    })
  })
}

export const removeCurrentUser = () => ({
  type: 'REMOVE_CURRENT_USER',
  payload: null
})

export const getCurrentUser = (id) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).onSnapshot( (doc) => {
    if (doc.exists) {
      dispatch({
        type: 'SET_CURRENT_USER',
        payload: doc.data()   
      })
    } else {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', 'ERROR: Something Went Wrong']   
      })
    }
  })
}

export const setAccountView = (view) => ({
  type: 'SET_ACCOUNT_VIEW',
  payload: view
})

export const setName = (id, firstName, lastName) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      firstName,
      lastName
    }
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'SUCCESS: Your basic account information was updated.']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', 'ERROR: ' + error]   
    })
  })
}

export const setEmail = (id, email) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      email
    }
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

export const setMobileNumber = (id, mobileNumber) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    profileInformation: {
      mobileNumber
    }
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

export const setUserProfile = (id, jobTypes, location, skills, positions, fbLink, imdbLink, availability, travel, union, bilingual, unions, languages) => async dispatch => {
  const database = await db
  const updateUserProfileSuccess = new Promise( (resolve, reject) => {
    try {
      database.collection("users").doc(id).update({
        profileInformation: {
          jobTypes, 
          location,
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
        }
      })
      .then( () => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'Success', 'SUCCESS: Your public profile information was updated.']
        })
        resolve('success')
      })
    }
    catch(error) {
      reject('error')
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Error', error.message]   
      })
    }
  })
  return await updateUserProfileSuccess
}

export const uploadProfileImage = (id, avatar, filename) => async dispatch => {
  const ref = storage.ref()
  const file = filename
  const name = id
  const metadata = {
    contentType: file.type
  }

  const [deletedOriginal, uploadNew] = await Promise.all([ deleteCurrentUserAvatar(ref, avatar, id), uploadAvatarImage(id, file, metadata)])
    .then( () => {
      dispatch({ 
        type: 'SET_ALERT',
        payload: [true, 'Success', 'SUCCESS: Your public avatar image has been updated.']
      })    
    })
    // .then( () => {
    //   const newFileName = `min_${id}`
    //   let newUrl = ' '
    //   setTimeout( async () => {
    //     newUrl = await getAvatarURL(newFileName)
    //   }, 36000)
    //   console.log(newUrl)
    // })  
    .catch( (error) => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Error', error.message]   
      })
    })
}

// Async actions used by the async functions below
export async function deleteCurrentUserAvatar(ref, avatar, imageName){
  avatar &&
    ref.child(imageName).delete()
      .then( () => { return true })
      .catch( (error) => { return false })

  return false
}

export async function uploadAvatarImage(imageName, imageFile, imageMetadata){
  const ref = storage.ref()
  ref.child(imageName).put(imageFile, imageMetadata)
}

export async function getAvatarURL(imageName){
  const ref = storage.ref()
  return await ref.child(imageName).getDownloadURL()
  
}

// Async actions and functions that call them to interact with Firebase Firestore and then user facing client
export const signUpUser = (email, password, firstName, lastName, mobileNumber, history) => async dispatch => {
  const database = await db

  try {
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then( (authUser) => {
        database.collection("users").doc(authUser.user.uid.toString()).set({
          id: authUser.user.uid.toString(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
        })
      })
      .then( () => {
        history.push("/")
      })
      .catch( error => {
        dispatch({
          type: 'SET_ALERT',
          payload: [true, 'Error', error.message]   
        })
        return 'error'
      })
  }
  catch(error) {
    return error
  }
}

export const usersSearch = (userName) => async dispatch => {
  const database = await db
  let nameMatch = []

  await database.collection("users").get().then( results => {
    for( let user of results.docs) {
      if(userName.toLowerCase().includes(user.data().firstName.toLowerCase()) ||
         userName.toLowerCase().includes(user.data().lastName.toLowerCase())) {
           nameMatch.push(user.data())
         }
    }
  })
  .then( () =>{
    dispatch({
      type: 'SEARCH_USER_BY_NAME_RESULTS',
      payload: nameMatch
    })
  })
}

export const searchUsersByName = (firstName, lastName) => async dispatch => {
  const database = await db
  let users = []
  const returnUserSearchResults = new Promise( (resolve, reject) => {
    try {
      database.collection("users").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
          return firstName.toLowerCase().includes(doc.data().firstName.toLowerCase()) || lastName.toLowerCase().includes(doc.data().lastName.toLowerCase()) ? users.push(doc.data()) : null
        })
      })
      .then( () => {
        resolve(users)
      })
    }
    catch(error) {
      reject('error')
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', error]   
      })
    }
  }) 
  const usersArr = await returnUserSearchResults
  await dispatch({
      type: 'SEARCH_USER_BY_NAME_RESULTS',
      payload: usersArr
    })
}
