import { db, auth } from '../db/firebase'

export const createJob = (id, jobID, jobObj) => async () => {
  const database = await db
  let emptyArr = []
  const getUserCreatedJobs = new Promise( (resolve, reject) => {
    try {
      database.collection("jobs").doc(id).get().then( results => {
        results.exists ? resolve(results) : resolve(emptyArr)
      })
    }
    catch(error) {
      reject(error)
    }
  })

  // const userCreatedJobs = await getUserCreatedJobs
  const newUserCreatedJob = {
    jobID: jobID,
    jobName: jobObj.jobName,
    jobCreator: jobObj.jobCreator,
    jobCreatorID: jobObj.jobCreatorID,
    unionMember: jobObj.unionMember,
    jobDesc: jobObj.jobDesc,
    jobDates: jobObj.jobDates,
    jobPositions: jobObj.jobPositions,
    jobLocation: jobObj.jobLocation,
    jobContact: jobObj.jobContact,
    jobStatus: 'pending',
    usersAssigned: jobObj.usersAssigned
  }  

  const updateUserCreatedJobs = new Promise( (resolve, reject) => {
    try {
      database.collection("jobs").doc(id).collection("createdJobs").doc(jobID).set(newUserCreatedJob)
        .then( () => {
          resolve('success')
        })
    }
    catch(error) {
      reject(error)
    }
  })
  return await updateUserCreatedJobs
}

export const userResultsForJobCreation = (jobObj) => async () => {
  const database = await db
  let users = []
  let tempUsers = []
  const availability = database.collection("availability").get()
  const getAllUsersBasedOnUnionAndLocation = database.collection("users").where("union", "==", jobObj.unionMember).where("location", "array-contains", jobObj.jobLocation).get()

  const getJobMatches = new Promise( (resolve, reject) => {
    try {
      getAllUsersBasedOnUnionAndLocation.then( querySnapshot => {
        for (let user of querySnapshot.docs) {
          for (let userPosition of user.data().positions) {
            if(jobObj.jobPositions.includes(userPosition.value)) {
              console.log('User was added because of position: ' + user.data().firstName)
              tempUsers.push(user.data())
              break
            }
          }
        }
        users = tempUsers
      })
      .then( () => {
        resolve(users)
      })
    }
    catch(error) {
      reject(error)
    }
  })
  return await getJobMatches
}

export const getJobOverviewData = (creatorID, jobID) => async () => {
  const database = await db
  const getJobOverview = database.collection("jobs").doc(creatorID).collection("createdJobs").doc(jobID).get()

  const getJobData = new Promise( (resolve, reject) => {
    try {
      getJobOverview.then( (results) => {
        results.exists ? resolve(results.data()) : resolve("error")
      })
    }
    catch(error) {
      reject(error)
    }
  })
  return await getJobData
}
