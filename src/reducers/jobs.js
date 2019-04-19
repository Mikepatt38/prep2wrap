const INITIAL_STATE = {
  jobs: [],
  userResults: [],
  currentJob: {},
}

function jobsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'CREATE_JOB': {
      return Object.assign({}, state, action.payload)
    }
    case 'CREATE_JOB_SEARCH_RESULTS': {
      return { ...state, userResults: action.payload }
    }
    case 'CREATE_UPDATE_JOB' : {
      return { ...state, currentJob: action.payload } 
    }
    case 'UPDATE_ASSIGNED_USERS': {
      return { ...state, currentJob: {
        ...state.currentJob,
        assignedUsers: action.payload
      }} 
    }
    default : return state
  }
}

export default jobsReducer