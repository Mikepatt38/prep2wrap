const INITIAL_STATE = {
  jobs: [],
  userResults: []
}

function jobsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'CREATE_JOB': {
      return Object.assign({}, state, action.payload)
    }
    case 'CREATE_JOB_SEARCH_RESULTS': {
      return { ...state, userResults: action.payload }
    }
    default : return state
  }
}

export default jobsReducer