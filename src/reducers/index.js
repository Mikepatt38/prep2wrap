import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import accountReducer from './account'
import availabilityReducer from './availability'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  accountState: accountReducer,
  availabilityState: availabilityReducer
})

export default rootReducer