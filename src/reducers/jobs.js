const INITIAL_STATE = {
  jobs: []
}

function availabilityReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'CREATE_JOB': {
      return Object.assign({}, state, action.payload)
    }
    default : return state
  }
}

export default availabilityReducer