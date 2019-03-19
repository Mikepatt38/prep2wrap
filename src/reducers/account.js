const INITIAL_STATE = {
  accountView: 'general',
  profileImageURL: '',
  currentUser: null,
  userSearchByNameResults: []
}

function accountReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SIGN_UP' : {
      return Object.assign({}, state, action.payload)
    }
    case 'SIGN_IN' : {
      return Object.assign({}, state, action.payload)
    }
    case 'RESET_PASSWORD' : {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_CURRENT_USER' : {
      return { ...state, currentUser: action.payload }
    }
    case 'REMOVE_CURRENT_USER' : {
      return { ...state, currentUser: action.payload }
    }
    case 'SEARCH_USER_BY_NAME' : {
      return Object.assign({}, state, action.payload)
    }
    case 'SEARCH_USER_BY_NAME_RESULTS' : {
      return Object.assign({}, state, {
        userSearchByNameResults: action.payload
      })
    }
    case 'CLEAR_SEARCH_USER_BY_NAME_RESULTS' : {
      return { ...state, userSearchByNameResults: action.payload }
    }
    case 'SET_NAME': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_EMAIL': {
      return Object.assign({}, state, action.payload)
    }
    case 'SET_ACCOUNT_VIEW': {
      return { ...state, accountView: action.payload }
    }
    default : return state
  }
}

export default accountReducer