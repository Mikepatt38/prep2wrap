import { db, auth, firebase } from '../db/firebase'
import { setAlert } from './components'

export const userResultsForJobCreation = (currentUserId, jobObj) => async () => {
  const database = await db
  let users = []
  let tempUsers = []
  const availability = database.collection("availability").get()
  const getAllUsersBasedOnUnionAndLocation = database.collection("users").where("profileInformation.union", "==", jobObj.unionMember).where("profileInformation.location", "array-contains", jobObj.jobLocation).get()

  const getJobMatches = new Promise( (resolve, reject) => {
    try {
      getAllUsersBasedOnUnionAndLocation.then( querySnapshot => {
        for (let user of querySnapshot.docs) {
          for (let userPosition of user.data().profileInformation.positions) {
            if(jobObj.jobPositions.includes(userPosition.value) && user.data().id !== currentUserId) {
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
    createdJobs.push(createdJob.data())
  }
  return createdJobs
} 

export async function getUserAcceptedJobs(database, currentUserID){
  let acceptedJobs = []

  let userJobRef = database.collection("jobs").doc(currentUserID)
  let acceptedJobsRef = await userJobRef.collection("acceptedJobs").get()  
  for(let acceptedJob of acceptedJobsRef.docs) {
    acceptedJobs.push(acceptedJob.data())
  }
  return acceptedJobs
} 

export async function deleteUserCreatedJob(database, currentUserID, jobID){
  database.collection("jobs").doc(currentUserID).collection("createdJobs").doc(jobID).delete()
}

export async function deleteAcceptedJob(database, usersAssigned, jobID){
  usersAssigned.map( user => {
    database.collection("jobs").doc(user.id).collection("acceptedJobs").doc(jobID).delete()
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

export async function createUserJobNotification(userID, jobID, jobNotificationData){
  const database = await db
  database.collection("jobs").doc(userID).collection("jobNotifications").doc(jobID).set(jobNotificationData)
}

export async function addUserJobDatesToAvailability(database, userID, jobDates){
  // about to add the dates to the user's availability 
  database.collection("users").doc(userID).update({ availability: { dates: jobDates }})
}

// Functions to send data from the API from the database back to the frontend client
export const createJob = (userID, jobID, jobObj, assignedUsers) => async () => {
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
    jobType: jobObj.jobType,
    usersAssigned: assignedUsers,
  }  

  try {
    createUserJob(userID, jobID, newUserCreatedJob, database)
    return 'success'
  }
  catch(error) {
    return('error')
  }
}

export const getUserJobs = (currentUserID) => async () => {
  const database = await db
  const createdJobs = await getUserCreatedJobs(database, currentUserID)
  const acceptedJobs = await getUserAcceptedJobs(database, currentUserID)

  try {
    return createdJobs.concat(acceptedJobs)
  }
  catch(error) {
    console.log(error)
  }
}

export const deletedCreatedJob = (currentUserID, jobID, usersAssigned) => async dispatch => {
  const database = await db

  try {
    deleteUserCreatedJob(database, currentUserID, jobID)
    deleteAcceptedJob(database, usersAssigned, jobID)
    dispatch(setAlert(true, "Success", "The job was successfully deleted."))
    return 'success'
  }
  catch(error) {
    dispatch(setAlert(true, "Error", "We could not deleted the selected job.."))
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