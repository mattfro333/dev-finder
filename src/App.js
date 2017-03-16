import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import DevFinder from './reducers'
import {Menu, Icon, Image, Dropdown} from 'semantic-ui-react'
import axios from 'axios'
import Logo from './DevFinder.png'
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state= {
      user: {}
    }
  }
  getProfile = () => {
    return axios.get('/api/me').then((r)=>this.setState({user: r}))
  }
  componentWillMount(){

  }
  render() {
    const trigger = (
      <span>
      <Image size="mini" shape='circular' src={this.state.profilepic || 'http://plumtri.org/sites/all/themes/plumtritheme/images/default_profile.jpg'} />
      </span>
    )
    return (
      <div>
        <Menu className='navbar' color='grey' inverted borderless icon secondary>
          <Menu.Item
            name='logo'
            onClick={()=>browserHistory.push('/dashboard')}
          >
            <Image src={Logo} size="mini"/>
          </Menu.Item>
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
          <Menu.Item>
            <Dropdown trigger={trigger} icon={null} >
              <Dropdown.Menu>
                <Dropdown.Item content='Profile' icon='user'/>
                <Dropdown.Item content='Edit Profile' icon='settings'/>
                <Dropdown.Item content='Log Out' icon='sign out'/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <div>{React.cloneElement(this.props.children, this.props)}</div>
      </div>
    );
  }
}

export default App;
