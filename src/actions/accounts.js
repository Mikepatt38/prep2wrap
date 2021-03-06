import { db, storage, auth as firebaseAuth } from '../db/firebase'
import { auth } from '../db'
import { firebase } from '../db/firebase'
import moment from 'moment'

export const clearSearchUserByNameResults = () => ({ type: 'CLEAR_SEARCH_USER_BY_NAME_RESULTS', payload: [] })

const toTimestamp = strDate => Date.parse(strDate);

export const signUserIn = (email, password, history) => async dispatch => {
  const database = await db
  const date = new Date()
  // converting the current date to a timestamp in seconds to compare to make sure the user
  // has not missed a payment before allowing them to login  
  const dateTimestamp = toTimestamp(date) / 1000
  auth.doSignInWithEmailAndPassword(email, password)
    .then(async (user) => {
      const userRef = await database.collection("users").doc(user.user.uid.toString()).get()
      const userData = await userRef.data()
      const userPaymentActive = userData.current_period_end.seconds > dateTimestamp
      // We are checking that the user's payment end is still in the future, thus they are able to still log
      // in since they paid for the current billing period
      if (userPaymentActive) {
        history.push("/")
      }
      else {
        dispatch({ type: 'SET_ALERT', payload: [true, 'Error', 'It seems you have an unpaid invoice'] })
      }
    })
    .catch(error => {
      const errorMsg = error.code === 'auth/user-not-found' ? 'No user was found with that email address.' : 'The provided password is not valid for that email account.'
      dispatch({ type: 'SET_ALERT', payload: [true, 'Error', errorMsg] })
    })
}

export const signUserOut = () => () => {
  auth.doSignOut()
}

export const resetPassword = (email) => async dispatch => {
  return auth.doPasswordReset(email)
    .then(() => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'success', 'Your Password Reset Link Was Sent']
      })
      return true
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
  database.collection("users").doc(id).onSnapshot((doc) => {
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
  console.log('Updating name')
  database.collection("users").doc(id).update({
    firstName,
    lastName
  })
    .then(() => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'success', 'Your basic account information was updated.']
      })
    })
    .catch((error) => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', 'ERROR: ' + error]
      })
    })
}

export const setEmail = (id, email) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    email
  })
    .then(() => {
      dispatch({
        type: 'ON_MODAL_SUCCESS',
        payload: [true, false]
      })
    })
    .catch((error) => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', "ERROR: " + error]
      })
    })
}

export const setMobileNumber = (id, mobileNumber) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    mobileNumber
  })
    .then(() => {
      dispatch({
        type: 'ON_MODAL_SUCCESS',
        payload: [true, false]
      })
    })
    .catch((error) => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', "ERROR: " + error]
      })
    })
}

export const setUserProfile = (id, jobTypes, location, skills, positions, fbLink, imdbLink, instagramLink, travel, union, bilingual, unions, languages) => async dispatch => {
  const database = await db
  const updateUserProfileSuccess = new Promise((resolve, reject) => {
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
        .then(() => {
          dispatch({
            type: 'SET_ALERT',
            payload: [true, 'Success', 'Your public profile information was updated.']
          })
          resolve('success')
        })
    }
    catch (error) {
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

  await Promise.all([deleteCurrentUserAvatar(ref, avatar, id), uploadAvatarImage(id, file, metadata)])
    .then(() => {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Success', 'Your public avatar image has been updated. Please wait a few moments for your image to update.']
      })
    })
    .catch((error) => {
      dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    })
}

// Async actions used by the async functions below
export function deleteCurrentUserAvatar(ref, avatar, imageName) {
  avatar &&
    ref.child(imageName).delete()
      .then(() => { return true })
      .catch((error) => { return false })
}

export function uploadAvatarImage(imageName, imageFile, imageMetadata) {
  const ref = storage.ref()
  ref.child(imageName).put(imageFile, imageMetadata)
    .then(() => { return true })
    .catch((error) => { return false })
}

export async function getAvatarURL(imageName) {
  const ref = storage.ref()
  return await ref.child(imageName).getDownloadURL()

}

// Async actions and functions that call them to interact with Firebase Firestore and then user facing client
export const signUpUser = (email, password, firstName, lastName, mobileNumber, stripe_id, cardInfo, history) => async dispatch => {
  // We want to create a date that the user will need to pay their new invoice by
  const date = new Date();
  // We will give the user two days past their billing date to pay their invoice
  const current_period_end = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDay() + 3
  );

  const database = await db

  try {
    let authUser = await auth.doCreateUserWithEmailAndPassword(email, password)
    await database.collection("users").doc(authUser.user.uid.toString()).set({
      id: authUser.user.uid.toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      stripe_id: stripe_id,
      stripe_card_brand: cardInfo.brand,
      stripe_card_last4: cardInfo.last4,
      current_period_end: current_period_end,
      completedJobs: 0,
      createdJobs: 0,
      acceptedJobs: 0
    })
    return history.push("/tutorial-walk-through")
  }
  catch (error) {
    dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    return error
  }
}

export function containsObject(obj, list) {
  return list.some(elem => elem === obj)
}

export function checkUserPositionMatch(userPositions, jobPositions) {
  let isMatch = false
  if (!jobPositions.length) isMatch = true
  userPositions.map(position => {
    if (jobPositions.some(el => el.value === position.value)) isMatch = true
  })
  return isMatch
}

export function checkUserLocationMatch(userLocations, jobLocations) {
  let isMatch = false
  console.log('Checking locations')
  if (!jobLocations.length) isMatch = true
  jobLocations.map(jobLocation => {
    console.log(jobLocation)
    if (userLocations.some(el => el.value === jobLocation.value)) isMatch = true
  })
  // else if(userLocations.some(el => el.value === jobLocation[0].value )) isMatch = true
  return isMatch
}

export function checkUserJobTypesMatch(userJobTypes, jobTypes) {
  let isMatch = false
  if (!jobTypes.length) isMatch = true
  userJobTypes.map(jobType => {
    if (jobTypes.some(el => el.value === jobType.value)) isMatch = true
  })
  return isMatch
}

export const usersSearch = (userName, positions, locations, jobTypes) => async dispatch => {
  const database = await db
  const matches = []
  const usersRef = database.collection("users")

  // if a user decides to search by the user's name
  if (userName) {
    const firstName = userName.toLowerCase().charAt(0).toUpperCase() + userName.split(" ")[0].slice(1)
    const lastName = userName.split(" ")[1] ? userName.split(" ")[1].toLowerCase().charAt(0).toUpperCase() + userName.split(" ")[1].slice(1) : ''
    let firstNameRef = await usersRef.where("firstName", "==", firstName).get()
    let lastNameRef = await usersRef.where("lastName", "==", lastName).get()
    let lastNameOnlyRef = await usersRef.where("lastName", "==", firstName).get()
    let userData = await [...firstNameRef.docs, ...lastNameRef.docs, ...lastNameOnlyRef.docs]
    userData.map(user => {
      if (user.data().profileInformation && user.data().profileInformation.location && user.data().profileInformation.positions && user.data().profileInformation.jobTypes) {
        const isLocationMatch = checkUserLocationMatch(user.data().profileInformation.location, locations)
        const isPositionMatch = checkUserPositionMatch(user.data().profileInformation.positions, positions)
        const isJobTypeMatch = checkUserJobTypesMatch(user.data().profileInformation.jobTypes, jobTypes)
        // Added the final check to remove duplicates from being returned for first and last name checks
        if (isLocationMatch && isPositionMatch && isJobTypeMatch && !matches.some(el => el.id === user.data().id)) matches.push(user.data())
      }
    })
  }

  else if (locations) {
    let locationSearchRef = await usersRef.where("profileInformation.location", "array-contains", { label: locations.label, value: locations.value }).get()
    let userData = await locationSearchRef.docs
    userData.map(user => {
      const isPositionMatch = checkUserPositionMatch(user.data().profileInformation.positions, positions)
      const isJobTypeMatch = checkUserJobTypesMatch(user.data().profileInformation.jobTypes, jobTypes)
      if (isPositionMatch && isJobTypeMatch && !matches.some(el => el.id === user.data().id)) matches.push(user.data())
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
  const returnUserSearchResults = new Promise((resolve, reject) => {
    try {
      database.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          return firstName.toLowerCase().includes(doc.data().firstName.toLowerCase()) || lastName.toLowerCase().includes(doc.data().lastName.toLowerCase()) ? users.push(doc.data()) : null
        })
      })
        .then(() => {
          resolve(users)
        })
    }
    catch (error) {
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

export const deleteUserAccount = (userGivenPassword, history, closeModal) => async dispatch => {
  const user = firebaseAuth.currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    userGivenPassword
  )

  // Prompt the user to re-provide their sign-in credentials
  user.reauthenticateAndRetrieveDataWithCredential(credential)
    .then(function () {
      // We want to set the current user to null
      dispatch({ type: 'REMOVE_CURRENT_USER', payload: null })

      user.delete()
        .then(function (res) {
          dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'You have successfully deleted your account'] })
          history.push('/login')
        })
        .catch(function (error) {
          dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
        })
    })
    .catch((error) => {
      closeModal()
      dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    });
}

// Update the users card information on their account after they update it with Stripe
export const updateUserCardInfo = (userID, cardInfo) => async dispatch => {
  const database = await db
  database.collection("users").doc(userID).update({
    stripe_card_brand: cardInfo.brand,
    stripe_card_last4: cardInfo.last4
  })
    .then(() => {
      dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'Successfully updated your default payment'] })
    })
    .catch((error) => {
      dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    })
}

// Update the users password -- must relogin the user to reauthenticate them and then can update the user password
export const updateUserPassword = (userCurrentPassword, userNewPassword) => async dispatch => {
  const user = firebaseAuth.currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    userCurrentPassword
  )

  // Re authenticate the user with the password they provided
  user.reauthenticateAndRetrieveDataWithCredential(credential)
    .then(function () {
      // we want to run the firebase function to update the user's password
      auth.doPasswordUpdate(userNewPassword)
        .then(() => {
          dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'Successfully updated your account password'] })
        })
        .catch(function (error) {
          dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
        })
    })
    .catch((error) => {
      dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
    })
}