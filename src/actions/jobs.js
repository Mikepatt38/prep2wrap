import { db, auth } from '../db/firebase'

export const createJob = (e, id, jobName) => async dispatch => {
  e.preventDefault()
  const database = await db
  database.collection("jobs").doc(id).update({
    jobName,
    jobId: id
  })
  .then( ()=> {
    dispatch({
      type: 'SET_ALERT',
      payload: [true, 'success', 'New job was created']
    })
  })
  .catch ( (error) => {
    console.log('Error: ' + error)
  })
}

