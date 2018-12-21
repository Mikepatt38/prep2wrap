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
        jobContact: jobObj.jobContact,
        jobStatus: 'pending'
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
  const database = await db
  let users = []
  let filteredUsers = []
  const availability = database.collection("availability").get()
  const getAllUsersBasedOnUnion = database.collection("users").where("union", "==", jobObj.unionMember).get()

  let arrUnique = (arr) => {
    return arr.filter( (item, index) => {
      return arr.indexOf(item) >= index-1
    })
  }

  const getJobMatches = new Promise( (resolve, reject) => {
    try {
      getAllUsersBasedOnUnion.then( querySnapshot => {
        for (let user of querySnapshot.docs) {
          for (let userPosition of user.data().positions) {
            if(!jobObj.jobPositions.includes(userPosition.value)) {
              console.log('User not added because of position: ' + user.data().firstName)
              break
            }
          }
          for( let userLocation of user.data().location) {
            if(!jobObj.jobLocation.includes(userLocation.value)) {
              console.log('User not added because of location: ' + user.data().firstName)
              break
            }
          }
          availability.then( querySnapshot => {
            for (let userAvail of querySnapshot.docs) {
              for (let date of userAvail.data().date) {
                if(jobObj.jobDates.includes(date)) {
                  console.log('User not added because of availability: ' + user.data().firstName)
                  break
                }
              }
            }
          })
          users.push(user.data())
        }
      })
      .then( () => {
        resolve(arrUnique(users))
      })
    }
    catch(error) {
      reject(error)
    }
  })
  return await getJobMatches
}
