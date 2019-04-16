import { db, auth } from '../db/firebase'

// Grabbing the user's current availability to load into the calendar
// and user availability list components on mount of the availability
// page
export const getCurrentAvailability = (currentUserId) => async () => {
  const database = await db
  let currentAvailability = []

  // Needing to compare if the type of availability is a STRING undefined to get the correct type comparison
  currentAvailability = database.collection("users").doc(currentUserId).get().then( results => {
    return (typeof results.data().availability !== 'undefined') ? results.data().availability : []
  })
  return currentAvailability
}

// Updating user dates with new set dates 
// Also updates the props so should cause the calendar to update 
export const updateUserAvailability = (userID, currentUserAvailability, newDate, newDateTitle, newDateType) => async dispatch => {
  const database = await db 

  // Creating the new date object to add and then adding it to the user's current availability
  // we don't want to create a new obj because .push modifies the original array and returns the 
  // modified array's new length. So we push and then use the array name as is
  const newDateObj = {
    date: newDate,
    dateTitle: newDateTitle,
    dateType: newDateType
  }
  currentUserAvailability.push(newDateObj)
  await database.collection("users").doc(userID).update({
    availability: currentUserAvailability
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', error.message]
    })
  })
  await dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Your calendar was updated!']
    })
}

export const updateUserDates = (userID, dates) => async dispatch => {
//   const database = await db

//   try{
//     let setAvailability = await database.collection("users").doc(userID).update({ availability: dates})
//     dispatch({
//       type: 'SET_USERS_DATES',
//       payload: dates
//     })
//     dispatch({
//       type: 'SET_ALERT',
//       payload: [true, 'Success', 'Your calendar was updated!']
//     })
//   }
//   catch(error) {
//     dispatch({
//       type: 'SET_ALERT',
//       payload: [true, 'Error', 'ERROR: ' + error]   
//     })
//   }
}

export const removeAvailabilityDate = (userID, date) => async dispatch => {
//   const database = await db
//   let currentDates = []

//   database.collection("users").doc(userID).get().then( results => {
//     if(results.data().availability) {
//       currentDates = results.data().availability.dates.filter( currentDate => currentDate.date !== date)
//     }
//     else {
//       dispatch({
//         type: 'SET_ALERT',
//         payload: [true, 'Info', 'The selected date does not exist and cannot be deleted.']
//       })
//     }
//   })
//   .then( () => {
//     dispatch(updateUserDates(userID, currentDates))
//   })
}

export const setAvailabilityDate = (userID, date, reason, type) => async dispatch => {
//   const database = await db
//   let currentDates = []
//   try {
//     let availability = await database.collection("users").doc(userID).get()
//     console.log(availability)
//     let dates = await availability.data().availability
//     if(dates) {
//       currentDates = availability.data().availability.dates === undefined ? [] : availability.data().availability.dates
//       currentDates.push({date: date, dateTitle: reason, dateType: type})
//     }
//     else {
//       currentDates = [{date: date, dateTitle: reason, dateType: type}]
//     }
//     dispatch(updateUserDates(userID, currentDates))
//   }
//   catch(error) {
//     return 'error'
//   }
}
