import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import user from './user'
import profile from './profile'
import skills from './skills'
const DevFinder = combineReducers({
  profile,
  user,
  skills,
  routing: routerReducer
})

export default DevFinder
