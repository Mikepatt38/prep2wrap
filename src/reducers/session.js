const INITIAL_STATE = {
  authUser: null,
  dropdownOpen: false
}

function sessionReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'AUTH_USER_SET': {
      return { ...state, authUser: action.payload }
    }
    case 'TOGGLE_DROPDOWN': {
      return { ...state, dropdownOpen: action.payload }
    }
    default : return state
  }
}

export default sessionReducer