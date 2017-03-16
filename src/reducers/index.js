import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import user from './user'
import profile from './profile'
const DevFinder = combineReducers({
  profile,
  user,
  routing: routerReducer
})

export default DevFinder
