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


export const userResultsForJobCreation = (jobObj) => async dispatch => {
  // e.preventDefault()
  const database = await db
  let users = []
  const getJobMatches = new Promise( (resolve, reject) => {
    try {
      database.collection("users").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
          if( doc.data().union === jobObj.unionMember && doc.data().availability ) {
            users.push(doc.data())
          }
        })
        resolve(users)
      })
    }
    catch(error) {
      reject(error)
    }
  })
  return await getJobMatches
}

