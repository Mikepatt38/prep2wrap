const INITIAL_STATE = {
  users: [],
  currentUserProfile: {}
}

const applySetUsers = (state, action) => ({
  ...state,
  users: [...state.users, action.users]
})

const setCurrentUserProfile = (state, action) => ({
  ...state,
  currentUserProfile: action.user
})

function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'USERS_SET' : {
      return applySetUsers(state, action)
    }
    case 'SET_CURRENT_USER_PROFILE' : {
      return setCurrentUserProfile(state, action)
    }
    default : return state
  }
}

export default userReducer