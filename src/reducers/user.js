const INITIAL_STATE = {
  currentUser: null,
  userSearchByNameResults: []
}

function userReducer(state = INITIAL_STATE, action) {
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
    default : return state
  }
}

export default userReducer