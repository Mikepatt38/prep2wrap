const INITIAL_STATE = {
  favorites: []
}

function favoritesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'GET_USER_FAVORITES': {
      return { ...state, fetching: false, favorites: action.payload }
    }
    case 'ADD_USER_FAVORITES': {
      return { ...state, favorites: action.payload }
    }
    default : return state
  }
}

export default favoritesReducer