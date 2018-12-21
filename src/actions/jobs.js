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


// getAllUsersBasedOnUnion.then( querySnapshot => {
//   for (let user of querySnapshot.docs) {
//     for (let userPosition of user.data().positions) {
//       if(!jobObj.jobPositions.includes(userPosition.value)) {
//         console.log('User not added because of position: ' + user.data().firstName)
//         break
//       }
//     }
//     for( let userLocation of user.data().location) {
//       if(!jobObj.jobLocation.includes(userLocation.value)) {
//         console.log('User not added because of location: ' + user.data().firstName)
//         break
//       }
//     }
//     availability.then( querySnapshot => {
//       for (let userAvail of querySnapshot.docs) {
//         for (let date of userAvail.data().date) {
//           if(jobObj.jobDates.includes(date)) {
//             console.log('User not added because of availability: ' + user.data().firstName)
//             break
//           }
//         }
//       }
//     })
//     users.push(user.data())
//   }
// })
