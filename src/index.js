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
        <Route path='/profile' component={DevProfile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
