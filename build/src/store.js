import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import axios from 'axios'

//Reducers
import rootReducer from './reducers/index'


getSkills()
const defaultState ={
  user: {},
  profile: {},
  skills:{},
}

const store = createStore(rootReducer, defaultState)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
