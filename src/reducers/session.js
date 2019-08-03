const INITIAL_STATE = {
  authUser: null,
  dropdownOpen: false,
  alertType: '',
  alertActive: false,
  alertText: '',
  userModalActive: false,
  user: null,
  jobModalActive: false,
  jobModalData: null
}

function sessionReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'AUTH_USER_SET': {
      return { ...state, authUser: action.payload }
    }
    case 'TOGGLE_DROPDOWN': {
      return { ...state, dropdownOpen: action.payload }
    }
    case 'SET_ALERT' : {
      return { ...state, alertActive: action.payload[0], alertType: action.payload[1], alertText: action.payload[2]}
    }
    case 'SET_USER_MODAL': {
      return {...state, userModalActive: action.payload[0], user: action.payload[1]}
    } 
    case 'SET_JOB_MODAL': {
      return {...state, jobModalActive: action.payload[0], jobModalData: action.payload[1]}
    }
    default : return state
  }
}

export default sessionReducer