import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (user) => async dispatch => {
  dispatch({
    type: 'SET_USERS_DATES',
    payload: user.availabilityDates === undefined ? [] : user.availabilityDates  
  })
}

// export const stopListeningForDates = (id) => async () => {
//   const database = await db
//   database.collection("users").doc(id).onSnapshot( () => {})
// }

export const setAvailabilityDate = (id, date, reason) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).get().then( results => {
    if(results.data().availabilityDates) {
      const currentDates = results.data().availabilityDates === undefined ? [] : results.data().availabilityDates
      currentDates.push({date: date, reason: reason})
      database.collection("users").doc(id).update({
        availabilityDates: currentDates
      })
    }
    else {
      database.collection("users").doc(id).update({
        availabilityDates: [{date: date, reason: reason}]
      })
    }
  })
  .then( () => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'Date availability was set!']
    })
  })
  .catch( (error) => {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'error', 'ERROR: ' + error]   
    })
  })
}