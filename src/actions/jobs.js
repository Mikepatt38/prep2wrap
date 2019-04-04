import { db, auth, firebase } from '../db/firebase'
import { setAlert } from './components'

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

export const denyJobInvitation = (jobData, currentUser, jobOverviewLink) => async (dispatch) => {
  const database = await db
  const updateUserStatus = database.collection("jobs").doc(jobData.jobCreatorID).collection("createdJobs").doc(jobData.jobID).set(jobData)
  const getUserNotificationsID = database.collection("jobs").doc(currentUser.id).collection("jobNotifications").get().then( (querySnapshot) => {
    let idToReturn = null
    querySnapshot.forEach(function(doc) {
      const compareLink = doc.data().link.split("/")[4] + '/' + doc.data().link.split("/")[5]
      if(compareLink === jobOverviewLink) {
        idToReturn = doc.id
      }
    })
    return idToReturn
  })


  const notificationID = await getUserNotificationsID

  const updateStatus = new Promise ( (resolve, reject) => {
    const jobNotificationData = {
      text: "A user just denied your job invitation.",
      link: jobOverviewLink
    }

    try {
      return updateUserStatus
      .then ( () => {
        dispatch(setAlert(true, "Info", "You declined the job and removed yourself from the job."))
        dispatch(removeUserJobNotification(currentUser.id, notificationID ))
        dispatch(createUserJobNotification(jobData.jobCreatorID, jobData.jobID, jobNotificationData))
        resolve("success")
      })
    }
    catch(error) {
      reject("error")
    }
  })
  return await updateStatus
}

export const createUserAcceptedJob = (userID, jobID, userJobData) => async () => {
  const database = await db

  const createUserAcceptedJobEntry = await database.collection("jobs").doc(userID).collection("acceptedJobs").doc(jobID).set(userJobData)

  return createUserAcceptedJobEntry
}

export const getUserJobNotifications = (userID) => async () => {
  const database = await db

  let notifications = []
  const getUserNotifications = database.collection("jobs").doc(userID).collection("jobNotifications").get().then( (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      notifications.push( {
        id: doc.id,
        text: doc.data().text,
        link: doc.data().link.length > 1 ? doc.data().link : ''
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
  let createdJobRef = database.collection("jobs").doc(userID)
  let setCreatedJobRef = await createdJobRef.collection("createdJobs").doc(jobID).set(newUserCreatedJob)
}

export async function getUserCreatedJobs(database, currentUserID){
  let createdJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let createdJobsRef = await userJobRef.collection("createdJobs").get()  
  for(let createdJob of createdJobsRef.docs) {
    const currentDate = new Date()
    const jobDate = new Date(createdJob.data().jobDates[0])
    let jobItem = {
      status: jobDate > currentDate ? 'Pending' : 'Active',
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
      status: jobDate > currentDate ? 'Pending' : 'Active',
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
      status: 'completed',
      ...completedJob.data()
    }
    completedJobs.push(jobItem)
  }
  return completedJobs
} 

export async function deleteUserCreatedJob(database, user, jobID, jobDates){
  database.collection("jobs").doc(user.id).collection("createdJobs").doc(jobID).delete()
  deleteJobAvailabilityDates(database, [user], jobDates )
}

export async function deleteAcceptedJob(database, usersAssigned, jobID){
  usersAssigned.map( user => {
    database.collection("jobs").doc(user.id).collection("acceptedJobs").doc(jobID).delete()
  })
}

export async function deleteJobAvailabilityDates(database, users, dates){
  users.map( async user => {
    const currentAvailability = await database.collection("users").doc(user.id).get().then( doc => doc.data().availability)
    const newAvailability = currentAvailability.filter( date => !(dates.includes(date.date)) ) 
    database.collection("users").doc(user.id).update({
      availability: newAvailability
    })
  })
}

export const removeUserJobNotification = (userID, notificationID ) => async (dispatch) => {
  const database = await db
  const updateNotifications = await database.collection("jobs").doc(userID).collection("jobNotifications").doc(notificationID).delete()

  return updateNotifications
}

export async function updateUserJobStatus(database, jobCreatorID, jobID, newAssignedUsers){

  let userJobStatusRef = database.collection("jobs").doc(jobCreatorID).collection("createdJobs").doc(jobID)
  let updateUserJobStatusRef = await userJobStatusRef.update({ usersAssigned: newAssignedUsers })
}

export async function getUserJobNotificationID(database, currentUserID, jobOverviewLink){
  let idToReturn = null
  let getUserNotificationsRef = await database.collection("jobs").doc(currentUserID).collection("jobNotifications").get()
  for(let notification of getUserNotificationsRef.docs){
    const compareLink = notification.data().link.split("/")[2] + '/' + notification.data().link.split("/")[3]
    if(compareLink === jobOverviewLink) {
      idToReturn = notification.data().id
    }  
  }
  return idToReturn
}

export function addUserJobDatesToAvailability(database, userID, jobDates){
  database.collection("users").doc(userID).update({ availability: jobDates})
}

export function createJobDataArr(jobObj){
  let jobDatesArr = []
  jobObj.jobDates.map(date => {
    jobDatesArr.push(
      {
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

  let jobCreated = await Promise.all([
    createUserJob(userID, jobID, newUserCreatedJob, database),
    addUserJobDatesToAvailability(database, userID, jobDatesArr)
  ])
  .catch( (error) => { dispatch(setAlert(true, "Error", error.message)) }) 
  return jobCreated ? 'success' : null
}

export const createUserJobNotification = (userID, jobID, jobNotificationData) => async () => {
  const database = await db
  database.collection("jobs").doc(userID).collection("jobNotifications").doc(jobID).set(jobNotificationData)
}

export const getUserJobs = (currentUserID) => async () => {
  const database = await db

  let [createdJobs, acceptedJobs, completedJobs] = await Promise.all([
    getUserCreatedJobs(database, currentUserID),
    getUserAcceptedJobs(database, currentUserID),
    getUserCompletedJobs(database, currentUserID)   
  ])
  .catch( () => { return [] })
  return [...createdJobs, ...acceptedJobs, ...completedJobs]
}

export const deletedCreatedJob = (user, jobID, jobName, jobDates, usersAssigned) => async dispatch => {
  const database = await db

  try {
    let deleteJobAndDates = await Promise.all([
      deleteUserCreatedJob(database, user, jobID, jobDates),
      deleteAcceptedJob(database, usersAssigned, jobID, jobName),
      deleteJobAvailabilityDates(database, usersAssigned, jobDates),
      dispatch(setAlert(true, "Success", "The job was successfully deleted."))
    ])
    return deleteJobAndDates ? 'success' : 'error'
  }
  catch(error) {
    dispatch(setAlert(true, "Error", error.message))
  }
}

export const createReduxJob = (jobState) => async dispatch => {
  dispatch({
    type: 'CREATE_UPDATE_JOB',
    payload: jobState
  })
}

export const updateReduxJobAssignedUsers = (usersAssigned) => async dispatch => {
  dispatch({
    type: 'UPDATE_ASSIGNED_USERS',
    payload: usersAssigned
  })
}

export const acceptJobInvitation = (jobCreatorID, jobID, currentUser, newAssignedUsers, jobOverviewLink, jobDates) => async (dispatch) => {
  const database = await db
  const jobNotificationData = {
    text: "A user just accepted your job invitation!",
    link: jobOverviewLink
  }
  try{
    let [updateJobStatus, 
        jobNotificationID, 
        updateUserJobDates,
        createJobNotification, 
        removeJobNotification
      ] = await Promise.all([
        updateUserJobStatus(database, jobCreatorID, jobID, newAssignedUsers), 
        addUserJobDatesToAvailability(database, currentUser.id, jobDates),
        getUserJobNotificationID(database, currentUser.id, jobOverviewLink),
        createUserJobNotification(jobCreatorID, jobID, jobNotificationData),
      ])
    .then( () => {
      removeUserJobNotification(currentUser.id, jobNotificationID )
      return 'success'
    })
  } 
  catch{
    return 'error'
  }
} 

export const getUserJobCount = (userID) => async () => {
  const database = await db
  const createdJobsRef = await database.collection("jobs").doc(userID).collection("createdJobs").get()
  const acceptedJobsRef = await database.collection("jobs").doc(userID).collection("acceptedJobs").get()
  const completedJobsRef = await database.collection("jobs").doc(userID).collection("completedJobs").get()
  
  return { "createdJobsCount": createdJobsRef.size, "acceptedJobsCount": acceptedJobsRef.size, "completedJobsCount": completedJobsRef.size }
}

export const userResultsForJobCreation = (userID, jobObj) => async () => {
  const database = await db
  let tempUsers = []
  let allMatches = []

  await database.collection("users").where("profileInformation.union", "==", jobObj.unionMember).get().then( snapshot => {
    for( let item of snapshot.docs ){ allMatches.push(item.data())} })
  await database.collection("users").where("profileInformation.location", "array-contains", jobObj.jobLocation).get().then( snapshot => {
    for( let item of snapshot.docs ){ allMatches.push(item.data())} })
  await database.collection("users").where("profileInformation.jobTypes", "array-contains", jobObj.jobType).get().then( snapshot => {
    for( let item of snapshot.docs ){ allMatches.push(item.data())} })
    
  const uniqueResults = allMatches.filter((object,index) => index === allMatches.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))

  for(let user of uniqueResults) {
    for(let userPosition of user.profileInformation.positions){
      if(jobObj.jobPositions.includes(userPosition.value) && user.id !== userID){
        tempUsers.push(user)
        break
      }
    }
  }
  return tempUsers
}