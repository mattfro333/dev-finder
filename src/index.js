import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DevFinder from './reducers'
import App from './App';
import DevDashboard from './components/dashboard/devDashboard/devDashboard'
import CompDashboard from './components/dashboard/compDashboard/compDashboard'
import JobSearch from './components/jobSearch/jobSearch'
import Messages from './components/messages/messages'
import DevWatchlist from './components/devWatchlist/devWatchlist'
import DevProfile from './components/profile/devProfile/devProfile'
import CompProfile from './components/profile/compProfile/compProfile'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import DevSignUp from './components/signup/devSignup/devSignup'
import CompanySignUp from './components/signup/companySignup/companySignup'
import './index.scss';

let store = createStore(DevFinder)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/dashboard-dev' component={DevDashboard} />
        <Route path='/dashboard-company' component={CompDashboard} />
        <Route path='/search' component={JobSearch} />
        <Route path='/messages' component={Messages} />
        <Route path='/watchlist' component={DevWatchlist} />
        <Route path='/profile/dev' component={DevProfile} />
        <Route path='/profile/company' component={CompProfile} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signup/developer' component={DevSignUp} />
        <Route path='/signup/company' component={CompanySignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
