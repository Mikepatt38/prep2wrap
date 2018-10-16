import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import accountReducer from './account'
import availabilityReducer from './availability'
import favoritesReducer from './favorites'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  accountState: accountReducer,
  availabilityState: availabilityReducer,
  favoritesState: favoritesReducer
})

export default rootReducer