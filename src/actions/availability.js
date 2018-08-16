import { db, auth } from '../db/firebase'

export const setAvailabilityDate = (id, date, reason, e) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("availability").doc(id).get().then( results => {
    return results
  }).then ( (results) => {
    if (results.exists) {
      const currentDates = results.data().date
      currentDates.push({date: date, reason: reason})
      database.collection("availability").doc(id).set({
        date: currentDates
      })
    }
    else {
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', 'ERROR: Something went wrong!']   
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