import { db, auth } from '../db/firebase'
const shortid = require('shortid')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

// Updating user dates with new set dates 
// Also updates the props so should cause the calendar to update 
export const updateUserAvailability = (userID, currentUserAvailability, newDate, newDateTitle, newDateType) => async dispatch => {
  const database = await db 

  // Creating the new date object to add and then adding it to the user's current availability
  // we don't want to create a new obj because .push modifies the original array and returns the 
  // modified array's new length. So we push and then use the array name as is
  const newDateObj = {
    id: shortid.generate(),
    date: newDate,
    dateTitle: newDateTitle,
    dateType: newDateType
  }
  currentUserAvailability.push(newDateObj)
  await database.collection("users").doc(userID).update({
    availability: currentUserAvailability
  })
  .catch( (error) => { dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })
  })
  await dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'Your calendar was updated!'] })
}

export const removeAvailabilityDate = (userID, currentDates, dateToDelete) => async dispatch => {
  const database = await db
  const dateIndex = currentDates.indexOf(dateToDelete)
  // Remove the date to be deleted from the user's current array of availability dates
  currentDates.splice(dateIndex, 1)
  await database.collection("users").doc(userID).update({
    availability: currentDates
  })
  .catch( (error) => { dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })})
  return dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'Your calendar was updated!']})
}

export const addMultipleDatesToAvailability = (userID, currentAvailability, newDates) => async dispatch => {
  const database = await db
  currentAvailability.push(...newDates)
  await database.collection("users").doc(userID).update({ availability: currentAvailability}) 
  .catch( (error) => { dispatch({ type: 'SET_ALERT', payload: [true, 'Error', error.message] })})
  return dispatch({ type: 'SET_ALERT', payload: [true, 'Success', 'Your calendar was updated!']})
}
