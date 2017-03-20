import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DevFinder from './reducers'
import Landing from './components/landing/Landing'
import App from './App';
import ConnectApp from './ConnectApp';
import DevDashboard from './components/dashboard/devDashboard/devDashboard'
import CompDashboard from './components/dashboard/compDashboard/compDashboard'
import JobSearch from './components/jobSearch/jobSearch'
import Messages from './components/messages/messages'
import DevWatchlist from './components/devWatchlist/devWatchlist'
import DevProfile from './components/profile/devProfile/devProfile'
import CompProfile from './components/profile/compProfile/compProfile'
import CreateJob from './components/createjob/createjob'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import JobDetails from './components/jobDetailView/jobDetailView'
import DevSignUp from './components/signup/devSignup/devSignup'
import Messaging from './components/messaging/messaging'
import CompanySignUp from './components/signup/companySignup/companySignup'
import './index.scss';

let store = createStore(DevFinder)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Landing}/>
      <Route path='/signup' component={SignUp} />
      <Route path='/app' component={ConnectApp}>
        <Route path='/profile/dev/dashboard/:userid' component={DevDashboard} />
        <Route path='/profile/company/dashboard/:userid' component={CompDashboard} />
        <Route path='/login' component={Login} />
        <Route path='/newjob' component={CreateJob} />
        <Route path='/search' component={JobSearch} />
        <Route path='/messages' component={Messages} />
        <Route path='/messaging' component={Messaging} />
        <Route path='/watchlist' component={DevWatchlist} />
        <Route path='/jobdetails/:id' component={JobDetails} />
        <Route path='/profile/dev/:userid' component={DevProfile} />
        <Route path='/profile/company/:userid' component={CompProfile} />
        <Route path='/profile/dev/edit/:userid' component={DevSignUp} />
        <Route path='/profile/company/edit/:userid' component={CompanySignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
