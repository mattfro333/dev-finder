import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DevFinder from './reducers'
import App from './App';
import Dashboard from './components/site/site'
import JobSearch from './components/jobSearch/jobSearch'
import Messages from './components/messages/messages'
import DevWatchlist from './components/devWatchlist/devWatchlist'
import DevProfile from './components/profile/devProfile/devProfile'
import CompProfile from './components/profile/compProfile/compProfile'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import './index.scss';

let store = createStore(DevFinder)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/search' component={JobSearch} />
        <Route path='/messages' component={Messages} />
        <Route path='/watchlist' component={DevWatchlist} />
        <Route path='/profile/dev' component={DevProfile} />
        <Route path='/profile/company' component={CompProfile} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
