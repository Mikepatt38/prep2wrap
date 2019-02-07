import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (user) => async dispatch => {
  dispatch({
    type: 'SET_USERS_DATES',
    payload: user.availability ? user.availability.dates : []  
  })
}

export const updateUserDates = (user, dates) => async dispatch => {
  const database = await db

  database.collection("users").doc(user.id).update({
    availability: {
      dates: dates
    }
  })
  .then( () => {
    console.log(dates)
    dispatch({
      type: 'SET_USERS_DATES',
      payload: dates
    })
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Your calendar was updated!']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', 'ERROR: ' + error]   
    })
  })
}

export const removeAvailabilityDate = (user, date) => async dispatch => {
  const database = await db
  let currentDates = []

  database.collection("users").doc(user.id).get().then( results => {
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
    dispatch(updateUserDates(user, currentDates))
  })
}

export const setAvailabilityDate = (user, date, reason) => async dispatch => {
  const database = await db
  let currentDates = []

  console.log(date)

  database.collection("users").doc(user.id).get().then( results => {
    if(results.data().availability) {
      currentDates = results.data().availability.dates === undefined ? [] : results.data().availability.dates
      currentDates.push({date: date, reason: reason})
    }
    else {
      currentDates = [{date: date, reason: reason}]
    }
  })
  .then( () => {
    dispatch(updateUserDates(user, currentDates))
  })
}
