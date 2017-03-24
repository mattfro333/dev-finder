import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import user from './user'
import profile from './profile'
import skills from './skills'

const DevFinderReducers = combineReducers({
  profile,
  user,
  skills,
  routing: routerReducer
})

const DevFinder =(state, action) =>{
  if (action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return DevFinderReducers(state, action)
}

export default DevFinder
