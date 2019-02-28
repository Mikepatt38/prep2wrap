import { combineReducers } from 'redux'
import sessionReducer from './session'
import accountReducer from './account'
import availabilityReducer from './availability'
import favoritesReducer from './favorites'
import jobsReducer from './jobs'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  accountState: accountReducer,
  availabilityState: availabilityReducer,
  favoritesState: favoritesReducer,
  jobsState: jobsReducer,
})

export default rootReducer