import { db, auth } from '../db/firebase'

export const createJob = (id, jobObj) => async () => {
  const database = await db
  const createJobSendInvitesSuccessful = new Promise( (resolve, reject) => {
    try {
      database.collection("jobs").doc(id).set({
        jobId: id,
        jobName: jobObj.jobName,
        jobCreator: jobObj.jobCreator,
        unionMember: jobObj.unionMember,
        jobDesc: jobObj.jobDesc,
        jobDates: jobObj.jobDates,
        jobPositions: jobObj.jobPositions,
        jobLocation: jobObj.jobLocation,
        jobContact: jobObj.jobContact
      })
      resolve('success')
    }
    catch(error) {
      reject('error')
    }
  })
  return await createJobSendInvitesSuccessful
}


export const userResultsForJobCreation = (jobObj) => async () => {
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

