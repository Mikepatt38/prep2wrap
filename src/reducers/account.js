const INITIAL_STATE = {
  accountView: 'general',
  profileImageURL: '',
}

function accountReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_NAME': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_EMAIL': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_ACCOUNT_VIEW': {
      return { ...state, accountView: action.payload }
    }
    case 'UPLOAD_PROFILE_IMAGE': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_PROFILE_IMAGE': {
      return { ...state, profileImageURL: action.payload }
    }
    default : return state
  }
}

export default accountReducer