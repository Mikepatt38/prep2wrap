const INITIAL_STATE = {
  authUser: null,
  dropdownOpen: false,
  alertType: '',
  alertActive: false,
  alertText: '',
  modalActive: false,
  modalTitle: '',
  modalChildren: null
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
    case 'SET_MODAL': {
      return { ...state, modalActive: action.payload[0], modalTitle: action.payload[1], modalChildren: action.payload[2] }
    }   
    default : return state
  }
}

export default sessionReducer