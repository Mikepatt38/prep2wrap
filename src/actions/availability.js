import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (user) => async dispatch => {
  dispatch({
    type: 'SET_USERS_DATES',
    payload: user.availabilityDates === undefined ? [] : user.availabilityDates  
  })
}

export const setAvailabilityDate = (user, date, reason) => async dispatch => {
  const database = await db
  database.collection("users").doc(user.id).get().then( results => {
    if(results.data().availabilityDates) {
      const currentDates = results.data().availabilityDates === undefined ? [] : results.data().availabilityDates
      currentDates.push({date: date, reason: reason})
      database.collection("users").doc(user.id).update({
        availabilityDates: currentDates
      })
    }
    else {
      database.collection("users").doc(user.id).update({
        availabilityDates: [{date: date, reason: reason}]
      })
    }
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'Date availability was set! Refresh the page to see your updated calendar.']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', 'ERROR: ' + error]   
    })
  })
}