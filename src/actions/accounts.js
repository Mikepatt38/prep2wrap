import { db, storage, auth as firebaseAuth } from '../db/firebase'
import { auth } from '../db'
import { firebase } from '../db/firebase'

export const clearSearchUserByNameResults = () => ({type: 'CLEAR_SEARCH_USER_BY_NAME_RESULTS', payload: [] })

export const signUserIn = (email, password, history) => dispatch => {
  auth.doSignInWithEmailAndPassword(email, password)
  .then( () => { history.push("/") })
  .catch(error => {
    const errorMsg = error.code === 'auth/user-not-found' ? 'No user was found with that email address.' : 'The provided password is not valid for that email account.'
    dispatch({ type: 'SET_ALERT', payload: [true, 'Error', errorMsg] })
  })
}

export const signUserOut = () => () => {
  auth.doSignOut()
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

export const removeCurrentUser = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_CURRENT_USER', payload: null })
}

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

export const setUserProfile = (id, jobTypes, location, skills, positions, fbLink, imdbLink, instagramLink, travel, union, bilingual, unions, languages) => async dispatch => {
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
          instagramLink,
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
          payload: [true, 'Success', 'Your public profile information was updated.']
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
  const metadata = {
    customMetadata: {
      'uid': id,
    },
    contentType: file.type
  }

  await Promise.all([ deleteCurrentUserAvatar(ref, avatar, id), uploadAvatarImage(id, file, metadata)])
  .then( () => {
    dispatch({ 
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Your public avatar image has been updated. Please wait a few moments for your image to update.']
    })
  }) 
  .catch( (error) => {
    dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
  }) 
}

// Async actions used by the async functions below
export function deleteCurrentUserAvatar(ref, avatar, imageName){
  avatar &&
    ref.child(imageName).delete()
      .then( () => { return true })
      .catch( (error) => { return false })
}

export function uploadAvatarImage(imageName, imageFile, imageMetadata){
  const ref = storage.ref()
  ref.child(imageName).put(imageFile, imageMetadata)
    .then( () => { return true })
    .catch( (error) => { return false }) 
}

export async function getAvatarURL(imageName){
  const ref = storage.ref()
  return await ref.child(imageName).getDownloadURL()
  
}

// Async actions and functions that call them to interact with Firebase Firestore and then user facing client
export const signUpUser = (email, password, firstName, lastName, mobileNumber, stripe_id, history) => async dispatch => {
  const database = await db

  try {
    let authUser = await auth.doCreateUserWithEmailAndPassword(email, password) 
    let createUser = await database.collection("users").doc(authUser.user.uid.toString()).set({
      id: authUser.user.uid.toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      stripe_id: stripe_id,
      completedJobs: 0,
      createdJobs: 0,
      acceptedJobs: 0
    })
    return history.push("/tutorial-walk-through")
  }
  catch(error) {
    dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    return error
  }
}

export function containsObject(obj, list) {
  return list.some(elem => elem === obj)
}

export function checkUserPositionMatch(userPositions, jobPositions){
  let isMatch = false
  if(!jobPositions.length) isMatch = true
  userPositions.map( position => {
    if(jobPositions.some(el => el.value === position.value)) isMatch = true
  })
  return isMatch
}

export function checkUserLocationMatch(userLocations, jobLocation){
  let isMatch = false
  if(!jobLocation.length) isMatch = true
  else if(userLocations.some(el => el.value === jobLocation[0].value )) isMatch = true
  return isMatch
}

export function checkUserJobTypesMatch(userJobTypes, jobTypes){
  let isMatch = false
  if(!jobTypes.length) isMatch = true
  userJobTypes.map( jobType => {
    if(jobTypes.some(el => el.value === jobType.value)) isMatch = true
  })
  return isMatch
}

export const usersSearch = (userName, positions, locations, jobTypes) => async dispatch => {
  const database = await db
  const matches = []
  const usersRef = database.collection("users")

  // if a user decides to search by the user's name
  // =========== TODO check for last name comparison as well ========== //
  if(userName){
    const firstName = userName.charAt(0).toUpperCase() + userName.split(" ")[0].slice(1)
    const lastName = userName.split(" ")[1] ? userName.split(" ")[1].charAt(0).toUpperCase() + userName.split(" ")[1].slice(1) : ''
    let nameSearchRef = await usersRef.where("firstName", "==", firstName).get()
    let userData = await nameSearchRef.docs
    userData.map( user => {
      if(user.data().profileInformation && user.data().profileInformation.location && user.data().profileInformation.positions && user.data().profileInformation.jobTypes ){
        const isLocationMatch = checkUserLocationMatch(user.data().profileInformation.location, locations)
        const isPositionMatch = checkUserPositionMatch(user.data().profileInformation.positions, positions)
        const isJobTypeMatch = checkUserJobTypesMatch(user.data().profileInformation.jobTypes, jobTypes)
        if(isLocationMatch && isPositionMatch && isJobTypeMatch) matches.push(user.data())
      }
    })
  }

  else if(locations.length){
    let locationSearchRef = await usersRef.where("profileInformation.location", "array-contains", {label: locations[0].label, value: locations[0].value}).get()
    let userData = await locationSearchRef.docs
    userData.map( user => {
      const isPositionMatch = checkUserPositionMatch(user.data().profileInformation.positions, positions)
      const isJobTypeMatch = checkUserJobTypesMatch(user.data().profileInformation.jobTypes, jobTypes)
      if(isPositionMatch && isJobTypeMatch) matches.push(user.data())
    })
  }
  dispatch({
    type: 'SEARCH_USER_BY_NAME_RESULTS',
    payload: matches
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

export const deleteUserAccount = (userGivenPassword, history) => async dispatch => {
  const user = firebaseAuth.currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    userGivenPassword
  )

  // Prompt the user to re-provide their sign-in credentials
  user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {

    // We want to set the current user to null
    dispatch({type: 'SET_CURRENT_USER', payload: null})

    user.delete()
      .then(function() {
        dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'You have successfully deleted your account'] })
        history.push('/login')
      })
      .catch(function(error) {
        console.log(error + ' ' + error.message)
        dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
      });

  })
  .catch(function(error) {
    console.log(error.message)
    dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
  });
} 