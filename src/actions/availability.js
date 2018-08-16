import { db, auth } from '../db/firebase'

export const setAvailabilityDate = (id, date) => async dispatch => {
  const database = await db
  database.collection("users").doc(id).update({
    date
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