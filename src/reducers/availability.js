const INITIAL_STATE = {
  blackOutDates: []
}

function availabilityReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_AVAILABILITY_DATE': {
      return Object.assign({}, state, action.payload)
    }
    case 'GET_AVAILABILITY_DATE': {
      return Object.assign({}, state, {
        blackOutDates: action.payload
      })
    }
    default : return state
  }
}

export default availabilityReducer