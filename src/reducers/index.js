import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import accountReducer from './account'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  accountState: accountReducer
})

export default rootReducer