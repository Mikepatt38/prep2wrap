import { db, auth } from '../db/firebase'

export const getAvailabilityDates = (id) => async dispatch => {
  const database = await db
  database.collection("availability").doc(id).onSnapshot( (doc) => {
    if (doc.exists) {
      dispatch({
        type: 'SET_USERS_DATES',
        payload: doc.data().date === undefined ? [] : doc.data().date  
      })
    }
    else {
      console.log("There are no dates to show")
      dispatch({
        type: 'SET_ALERT',
        payload: [true, 'error', 'ERROR: Something went wrong!']   
      })
    }
  }) 
}

export const stopListeningForDates = (id) => async dispatch => {
  const database = await db
  database.collection("availability").doc(id).onSnapshot( () => {})
}

export const setAvailabilityDate = (id, date, reason) => async dispatch => {
  const database = await db
  database.collection("availability").doc(id).get().then( results => {
    return results
  }).then ( (results) => {
    if (results.exists) {
      const currentDates = results.data().date === undefined ? [] : results.data().date
      currentDates.push({date: date, reason: reason})
      database.collection("availability").doc(id).set({
        date: currentDates
      })
    }
    else {
      database.collection("availability").doc(id).set({
        date: [{date: date, reason: reason}]
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