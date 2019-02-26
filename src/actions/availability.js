import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (user) => async dispatch => {
  dispatch({
    type: 'SET_USERS_DATES',
    payload: user.availability ? user.availability.dates : []  
  })
}

export const updateUserDates = (userID, dates) => async dispatch => {
  const database = await db

  try{
    let setAvailability = await database.collection("users").doc(userID).update({ availability: { dates: dates }})
    dispatch({
      type: 'SET_USERS_DATES',
      payload: dates
    })
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Your calendar was updated!']
    })
  }
  catch(error) {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', 'ERROR: ' + error]   
    })
  }
}

export const removeAvailabilityDate = (userID, date) => async dispatch => {
  const database = await db
  let currentDates = []

  database.collection("users").doc(userID).get().then( results => {
    if(results.data().availability) {
      currentDates = results.data().availability.dates.filter( currentDate => currentDate.date !== date)
    }
    else {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'Info', 'The selected date does not exist and cannot be deleted.']
      })
    }
  })
  .then( () => {
    dispatch(updateUserDates(userID, currentDates))
  })
}

export const setAvailabilityDate = (userID, date, reason) => async dispatch => {
  const database = await db
  let currentDates = []
  try {
    let availability = await database.collection("users").doc(userID).get()
    console.log(availability)
    let dates = await availability.data().availability
    if(dates) {
      currentDates = availability.data().availability.dates === undefined ? [] : availability.data().availability.dates
      currentDates.push({date: date, reason: reason})
      // dispatch(updateUserDates(userID, currentDates.push({date: date, reason: reason}) ))
    }
    else {
      currentDates = [{date: date, reason: reason}]
    }
    dispatch(updateUserDates(userID, currentDates))
  }
  catch(error) {
    return 'error'
  }
}
