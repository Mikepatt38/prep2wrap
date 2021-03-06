import { db, auth, firebase } from '../db/firebase'
import { setAlert } from './components'
const shortid = require('shortid')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

// Setup and call job modal to display job data
export const setJobsModal = (active, jobData) => ({
  type: 'SET_JOB_MODAL',
  payload: [active, jobData]
})

export const getAllUsersData = () => async () => {
  let temp = []
  const database = await db
  const users = await database.collection("users").get().then( results => {
    results.forEach( (doc) => {
      temp.push(doc.data())
    })
  })
  return temp
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

// We need to refactor this to use the logic on this side and not on the client,
// We do not need to make it this complicated
export const denyJobInvitation = (currentUser, jobCreatorID, jobID, newAssignedUsers, position) => async dispatch => {
  const database = await db
  const jobNotificationData = {
    text: `${currentUser.firstName + ' ' + currentUser.lastName} has denied to join your crew as a ${position}`,
    type: 'deny'
  }

  dispatch(removeUserJobNotification(currentUser.id, jobID))
  dispatch(createUserJobNotification(jobCreatorID, jobID, jobNotificationData))
  // Delete the pending job., we need to do this first before we send the new job's request update
  // to the client
  await Promise.all([
    deleteUserPendingJob(database, currentUser.id, jobID),
    database.collection("jobs").doc(jobCreatorID).collection("createdJobs").doc(jobID).update({
      usersAssigned: newAssignedUsers
    })
  ])
  .then(() => {
    dispatch(setAlert(true, "Success", "You declined the job and removed yourself from the job."))
  })
  .catch((error) => {
    dispatch(setAlert(true, "Error", "We could not deny the job invitation."))
  })
}

export const createUserAcceptedJob = (userID, jobID, userJobData) => async () => {
  const database = await db
  let promises = []
  promises.push(database.collection("jobs").doc(userID).collection("acceptedJobs").doc(jobID).set(userJobData))
  promises.push(database.collection("users").doc(userID).update({
    acceptedJobs: firebase.firestore.FieldValue.increment(1)
  }))
}

export const getUserJobNotifications = (userID) => async () => {
  const database = await db

  let notifications = []
  const getUserNotifications = database.collection("jobs").doc(userID).collection("jobNotifications").get().then( (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      notifications.push( {
        id: doc.id,
        text: doc.data().text,
        type: doc.data().type
        })
      })
      return notifications
  })

  const getNotifications = new Promise ( (resolve, reject) => {
    try {
      getUserNotifications
      .then ( (results) => {
        resolve(results)
      })
    }
    catch(error) {
      reject("error")
    }
  })

  const docData = await getNotifications
  return docData
}

// All async functions to work with the database API
export async function createUserJob(userID, jobID, newUserCreatedJob, database){ 
  database.collection("jobs").doc(userID).collection("createdJobs").doc(jobID).set(newUserCreatedJob)
  database.collection("users").doc(userID).update({
    createdJobs: firebase.firestore.FieldValue.increment(1)
  })
}

export async function getUserCreatedJobs(database, currentUserID){
  let createdJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let createdJobsRef = await userJobRef.collection("createdJobs").get()  
  for(let createdJob of createdJobsRef.docs) {
    const currentDate = new Date()
    const jobDate = new Date(createdJob.data().jobDates[0])
    let jobItem = {
      status: 'Active',
      ...createdJob.data()
    }
    createdJobs.push(jobItem)
  }
  return createdJobs
} 

export async function getUserAcceptedJobs(database, currentUserID){
  let acceptedJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let acceptedJobsRef = await userJobRef.collection("acceptedJobs").get()  
  for(let acceptedJob of acceptedJobsRef.docs) {
    const currentDate = new Date()
    const jobDate = new Date(acceptedJob.data().jobDates[0])
    let jobItem = {
      status: 'Active',
      ...acceptedJob.data()
    }
    acceptedJobs.push(jobItem)
  }
  return acceptedJobs
} 

export async function getUserCompletedJobs(database, currentUserID){
  let completedJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let completedJobsRef = await userJobRef.collection("completedJobs").get()  
  for(let completedJob of completedJobsRef.docs) {
    let jobItem = {
      status: 'Completed',
      ...completedJob.data()
    }
    completedJobs.push(jobItem)
  }
  return completedJobs
} 

export async function getUserPendingJobs(database, currentUserID){
  let pendingJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let pendingJobsRef = await userJobRef.collection("pendingJobs").get()
  for(let pendingJob of pendingJobsRef.docs){
    let jobItem = {
      jobStatus: 'Review',
      ...pendingJob.data()
    }
    pendingJobs.push(jobItem)
  }
  return pendingJobs
}

export function deleteUserCreatedJob(database, user, jobID, jobDates){
  database.collection("jobs").doc(user.id).collection("createdJobs").doc(jobID).delete()
  database.collection("users").doc(user.id).update({
    createdJobs: user.createdJobs === 0 ? 0 : user.createdJobs - 1
  })
  deleteJobAvailabilityDates(database, [user], jobDates)
}

export function deleteAcceptedJob(database, usersAssigned, jobID){
  usersAssigned.map( user => {
    database.collection("jobs").doc(user.id).collection("acceptedJobs").doc(jobID).delete()
    database.collection("users").doc(user.id).update({
      acceptedJobs: user.acceptedJobs === 0 ? 0 : user.acceptedJobs - 1
    })
  })
}

export async function deleteAllUsersPendingJobs(database, users, jobID){
  let promises = []
  users.map( user => {
    promises.push(database.collection("jobs").doc(user.id).collection("pendingJobs").doc(jobID).delete())
  })
  Promise.all(promises).then( () => true)
}

export async function deleteUserPendingJob(database, userID, jobID){
  database.collection("jobs").doc(userID).collection("pendingJobs").doc(jobID).delete()
}

export async function deleteJobAvailabilityDates(database, users, dates){
  let promises = []
  for(let user of users){
    const currentAvailability = user.availability ? user.availability : []
    const newAvailability = currentAvailability.filter( date => !(dates.includes(date.date)) ) 
    promises.push(database.collection("users").doc(user.id).update({
      availability: newAvailability
    }))
  }
  Promise.all(promises).then( () => true)
}

export const removeUserJobNotification = (userID, notificationID ) => async () => {
  const database = await db
  database.collection("jobs").doc(userID).collection("jobNotifications").doc(notificationID).delete()
}

export async function updateUserJobStatus(database, jobCreatorID, jobID, jobStartDate, userID){
  const currentDate = new Date()
  const jobDate = new Date(jobStartDate)

  let userJobStatusRef = database.collection("jobs").doc(jobCreatorID).collection("createdJobs").doc(jobID).get()
    .then( results => {
      const userIndex = results.data().usersAssigned.findIndex(user => user.id === userID)
      let userToUpdate = {
        ...results.data().usersAssigned[userIndex],
        status: 'Accepted'
      }
      const newAssignedUsers = results.data().usersAssigned
      newAssignedUsers.splice(userIndex, 1) 
      newAssignedUsers.push(userToUpdate)
      database.collection("jobs").doc(jobCreatorID).collection("createdJobs").doc(jobID).update({
        status: 'Active',
        usersAssigned: newAssignedUsers
      })
    })
}

export async function getUserJobNotificationID(database, currentUserID, jobID){
  let idToReturn = null
  let getUserNotificationsRef = await database.collection("jobs").doc(currentUserID).collection("jobNotifications").get()
  for(let notification of getUserNotificationsRef.docs){
    if(notification.data().id === jobID) {
      idToReturn = notification.data().id
    }  
  }
  return idToReturn
}

export async function addUserJobDatesToAvailability(database, userID, jobDates){
  // We must first loop through the current availability, if there are already set dates,
  // go through and add the new job dates to this availability array, if there
  // are none then just set the new job dates as the user's availability
  await database.collection("users").doc(userID).get().then( doc => { 
    return doc.data().availability === undefined 
      ? [] 
      : doc.data().availability.map( date => {
        jobDates.push(date)
      }) 
  })
  database.collection("users").doc(userID).update({ availability: jobDates})
}

export function createJobDataArr(jobObj){
  let jobDatesArr = []
  jobObj.jobDates.map(date => {
    jobDatesArr.push(
      {
        id: shortid.generate(),
        date: date,
        dateTitle: jobObj.jobName,
        dateType: 'booked'
      }
    )
  })
  return jobDatesArr
}

// Functions to send data from the API from the database back to the frontend client
export const createJob = (userID, jobID, jobObj, assignedUsers) => async dispatch => {
  const database = await db
  const newUserCreatedJob = {
    jobID: jobID,
    jobName: jobObj.jobName,
    jobCreator: jobObj.jobCreator,
    jobCreatorID: jobObj.jobCreatorID,
    jobContactEmail: jobObj.jobContactEmail,
    unionMember: jobObj.unionMember,
    jobDesc: jobObj.jobDesc,
    jobDates: jobObj.jobDates,
    jobPositions: jobObj.jobPositions,
    jobLocation: jobObj.jobLocation,
    jobContact: jobObj.jobContact,
    dateSelectorRangeActive: jobObj.dateSelectorRangeActive,
    jobStatus: jobObj.jobStatus,
    usersAssigned: assignedUsers,
  }  
  const jobDatesArr = await createJobDataArr(jobObj)

  return Promise.all([
    createUserJob(userID, jobID, newUserCreatedJob, database),
    addUserJobDatesToAvailability(database, userID, jobDatesArr)
  ]).then( () => true )
  .catch( (error) => { dispatch(setAlert(true, "Error", error.message)) }) 
}

export const createPendingJob = (userID, jobCreator, jobID, assignedUsers) => async () => {
  const database = await db 
  const index = assignedUsers.findIndex(user => user.id === userID)
  const pendingJobData = assignedUsers[index]
  let promises = []

  promises.push(database.collection("jobs").doc(userID).collection("pendingJobs").doc(jobID).set({
    ...pendingJobData,
    jobCreator: jobCreator,
    usersAssigned: assignedUsers
  }))
  return Promise.all(promises).then( () => true)
}

export const createUserJobNotification = (userID, jobID, jobNotificationData) => async () => {
  const database = await db
  database.collection("jobs").doc(userID).collection("jobNotifications").doc(jobID).set(jobNotificationData)
}

export const getUserJobs = (currentUserID) => async () => {
  const database = await db

  let [createdJobs, acceptedJobs, completedJobs, pendingJobs] = await Promise.all([
    getUserCreatedJobs(database, currentUserID),
    getUserAcceptedJobs(database, currentUserID),
    getUserCompletedJobs(database, currentUserID),
    getUserPendingJobs(database, currentUserID)
  ])
  .catch( () => { return [] })
  return [...createdJobs, ...acceptedJobs, ...completedJobs, ...pendingJobs]
}

export const createReduxJob = (jobState) => async dispatch => {
  dispatch({
    type: 'CREATE_UPDATE_JOB',
    payload: jobState
  })
}

export const updateReduxJobAssignedUsers = (usersAssigned) => async dispatch => {
  return (
    dispatch({
      type: 'UPDATE_ASSIGNED_USERS',
      payload: usersAssigned
    })
  )
}

export const acceptJobInvitation = (jobCreatorID, jobID, currentUser, jobDates, position) => async (dispatch) => {
  const database = await db

  const jobNotificationData = {
    text: `${currentUser.firstName} ${currentUser.lastName} accepted to join your crew as a ${position}`,
    type: 'accept'
  }
  dispatch(removeUserJobNotification(currentUser.id, jobID))
  dispatch(createUserJobNotification(jobCreatorID, jobID, jobNotificationData))


  await Promise.all([
    deleteUserPendingJob(database, currentUser.id, jobID),
    updateUserJobStatus(database, jobCreatorID, jobID, jobDates[0], currentUser.id), 
    addUserJobDatesToAvailability(database, currentUser.id, jobDates),
  ])
  .then( () => {
    dispatch(setAlert(true, "Success", "You successfully accepted the job."))
    return 'success'
  })
  .catch((error) => {
    dispatch(setAlert(true, "Error", "We could not accept the job invitation"))
    return 'error'
  })
} 

export const userResultsForJobCreation = (userID, jobObj) => async () => {
  const database = await db
  let tempUsers = []
  let longerArr = []
  let shorterArr = []
  const usersRef = database.collection("users")
  // Need two separate queries because Firebase only allows one "array-contains" argument per query
  const unionAndLocationResults = await usersRef
    .where("profileInformation.union", "==", jobObj.unionMember)
    .where("profileInformation.location", "array-contains", jobObj.jobLocation).get()
  const jobTypeResults = await database.collection("users").where("profileInformation.jobTypes", "array-contains", jobObj.jobType).get()

  // Turning the snapshot into an array of objects so that they can be compared for the same results
  const unionAndLocationResultsObj = unionAndLocationResults.docs.map( result => {
    return result.data()
  })
  const jobTypeResultsObj = jobTypeResults.docs.map( result => {
    return result.data()
  })

  // I want to make sure the longer array is being filtered by the shorter results array
  if(unionAndLocationResultsObj.length > jobTypeResultsObj.length ){
    longerArr = unionAndLocationResultsObj
    shorterArr = jobTypeResultsObj
  }
  else {
    shorterArr = unionAndLocationResultsObj
    longerArr = jobTypeResultsObj   
  }

  // Only keep results that satisfy both query conditions
  const results = longerArr.filter( object => shorterArr.some(obj => obj.id === object.id)) 
  // We want only users that satisfy the position requirements, we check this last to only
  // iterate over user positions that we need
  // const finalResults = results.filter(user => jobObj.jobPositions.map(position => user.profileInformation.positions.some(userPosition => userPosition.value === position.value)))
  results.map(user => user.profileInformation.positions.map(position => jobObj.jobPositions.some(jobPosition => {
    position.value === jobPosition && !tempUsers.includes(user) && userID !== user.id && tempUsers.push(user) 
  })))
  return tempUsers
}

export async function moveUserJobToCompleted(database, currentUser, jobObj){
  let promises = []
  promises.push(database.collection("jobs").doc(currentUser.id).collection("completedJobs").doc(jobObj.jobID).set({
    ...jobObj,
    status: 'Completed'
  }))
  promises.push(database.collection("users").doc(currentUser.id).update({
    completedJobs: firebase.firestore.FieldValue.increment(1)
  }))
  promises.push(database.collection("jobs").doc(currentUser.id).collection("createdJobs").doc(jobObj.jobID).delete())
  Promise.all(promises).then( () => true )
}

export async function moveAcceptedJobToCompleted(database, usersAssigned, jobObj){
  let promises = []
  usersAssigned.map( async (user) => {
    promises.push(database.collection("jobs").doc(user.id).collection("completedJobs").doc(jobObj.jobID).set({
      ...jobObj,
      status: 'Completed'
    }))
    promises.push(database.collection("users").doc(user.id).update({
      completedJobs: firebase.firestore.FieldValue.increment(1)
    }))
    promises.push(database.collection("jobs").doc(user.id).collection("acceptedJobs").doc(jobObj.jobID).delete())
  })
  Promise.all(promises).then( () => true)
}

export const deletedCreatedJob = (user, jobID, jobName, jobDates, usersAssigned) => async dispatch => {
  const database = await db

  try {
    Promise.all([
      deleteUserCreatedJob(database, user, jobID, jobDates),
      deleteAcceptedJob(database, usersAssigned, jobID, jobName),
      deleteAllUsersPendingJobs(database, usersAssigned, jobID),
      deleteJobAvailabilityDates(database, usersAssigned, jobDates),
    ]).then( () => {
      dispatch(setAlert(true, "Success", "The job was successfully deleted."))
      return 'success'
    })
  }
  catch(error) {
    dispatch(setAlert(true, "Error", error.message))
  }
}

export const completeUserJob = (currentUser, jobObj) => async dispatch => {
  const database = await db

  // add the job creator to current users apart of the job
  let allUsers = [
    ...jobObj.usersAssigned,
    currentUser
  ]
  // move the user's current created job to a new completed job section of the job database
  // first we need to get the job, then we need to add this job to the completed job area
  // after we add it to completed we need to delete it\
  await Promise.all([
    moveUserJobToCompleted(database, currentUser, jobObj),
    moveAcceptedJobToCompleted(database, jobObj.usersAssigned, jobObj),
    deleteJobAvailabilityDates(database, allUsers, jobObj.jobDates),
  ])
  .then(() => {
    dispatch(setAlert(true, "Success", 'You successfully marked the job as completed.'))
  })
  .catch((error) => {
    dispatch(setAlert(true, "Error", 'We could not move the job to completed'))
  })
}