import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import DevFinder from './reducers'
import {Menu, Icon, Image} from 'semantic-ui-react'

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Menu className='navbar'color='teal' inverted borderless icon>
          <Menu.Item
            position="left"
            name='devFinder'
            onClick={()=>browserHistory.push('/dashboard')}
          >
            Dev Finder
          </Menu.Item>
          <Menu.Item
            position="right"
            name='reviews'
            onClick={()=>browserHistory.push('/search')}
          >
            <Icon name='search' />
          </Menu.Item>
          <Menu.Item
            onClick={()=>browserHistory.push('/watchlist')}
            name='watchlist'
          >
            <Icon name='star' />
          </Menu.Item>
          <Menu.Item
            name='messages'
            onClick={()=>browserHistory.push('/messages')}
          >
            <Icon name='mail' />
          </Menu.Item>
          <Menu.Item
            name='profile'
            onClick={()=>browserHistory.push('/profile')}
          >
            <Image src='http://plumtri.org/sites/all/themes/plumtritheme/images/default_profile.jpg' size="mini" shape="circular" />
          </Menu.Item>
        </Menu>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default App;
