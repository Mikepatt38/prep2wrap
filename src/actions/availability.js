import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (user) => async dispatch => {
  dispatch({
    type: 'SET_USERS_DATES',
    payload: user.availability ? user.availability.dates : []  
  })
}

export const setAvailabilityDate = (user, date, reason) => async dispatch => {
  const database = await db
  let currentDates = []

  database.collection("users").doc(user.id).get().then( results => {
    if(results.data().availability) {
      currentDates = results.data().availability.dates === undefined ? [] : results.data().availability.dates
      currentDates.push({date: date, reason: reason})
      database.collection("users").doc(user.id).update({
        availability: {
          dates: currentDates
        }
      })
    }
    else {
      database.collection("users").doc(user.id).update({
        availability: {
          dates: [{date: date, reason: reason}]
        }
      })
    }
  })
  .then( () => {
    dispatch({
      type: 'SET_USERS_DATES',
      payload: currentDates.length > 0 ? currentDates : [{date: date, reason: reason}]
    })
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Success', 'Date availability was set!']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'Error', 'ERROR: ' + error]   
    })
  })
}
