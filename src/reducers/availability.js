const INITIAL_STATE = {
  dates: [],
  userDates: [],
  fetching: true
}

function availabilityReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_AVAILABILITY_DATE': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_USERS_DATES': {
      return { ...state, fetching: false, userDates: action.payload }
    }
    case 'GET_AVAILABILITY_DATES': {
      return Object.assign({}, state, {
        dates: action.payload
      })
    }
    case 'STOP_LISTENING_FOR_DATES': {
      return Object.assign({}, state, action.payload)
    }
    default : return state
  }
}

export default availabilityReducer