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
  const getJobMatches = new Promise( (resolve, reject) => {
    try {

      getAllUsersBasedOnUnion.then( querySnapshot => {
        querySnapshot.forEach( (user) => {
          user.data().positions.map( userPosition => {
            // checking if the user has the position listed under their profile
            if(jobObj.jobPositions.includes(userPosition.value)) {
              console.log('These users passed the positions check: ' + user.data().firstName)
              user.data().location.map( userLocation => {
                // checking if the user has that location as an available location to work at
                if(jobObj.jobLocation.includes(userLocation.value)) {
                  console.log('These users passed the location check: ' + user.data().firstName)
                  availability.then ( querySnapshot => {
                    querySnapshot.exist 
                    ?
                      querySnapshot.forEach( ( userAvail) => {
                        userAvail.data().map( date => {
                          if(!jobObj.jobDates.includes(date)) {
                            console.log('These users passed the positions check: ' + userAvail.data().firstName)
                            users.push(user.data())
                          }
                        })
                      })
                    :
                      users.push(user.data())
                  })
                }
              })
            }
          })
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

// database.collection("users").get().then( (querySnapshot) => {
//   querySnapshot.forEach( (doc) => {
//     if( doc.data().union === jobObj.unionMember ) {
//       console.log(doc.data().firstName)
//       doc.data().positions.map ( position => {
//         if(jobObj.jobPositions.includes(position.value)) {
//           console.log(doc.data().firstName)
//           availability.then( (querySnapshot) => {
//             querySnapshot.forEach( (document) => {
//               document.data().date.map( dates => {
//                 if(!jobObj.jobDates.includes(dates.date)){
//                   console.log(doc.data().firstName)
//                   users.push(doc.data())
//                 }
//               })
//             })
//           })
//         }
//       })
//     }
//   })
// })

