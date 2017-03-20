import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import DevFinder from './reducers'
import {Menu, Icon, Image, Dropdown} from 'semantic-ui-react'
import axios from 'axios'
import Logo from './DevFinder.png'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      user: {},
      links: {
        dashboard: '',
        profile: '',
        editProfile: '',
        search: '',
        profilepic: '',
        watchAdd: '',
        watchAddIcon: 'star'
      }
    }
    this.setLinks = this.setLinks.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  getProfile = () => {
    return axios.get('/api/me').then((r)=>this.setState({user: r}))
  }
  logOut = () => {
    return axios.get('/api/logout')
  }
  setLinks = () => {

    if(this.props.user.user.user_id){
      if(this.props.user.user.company == true) {
      this.setState({links:{
        dashboard: `/profile/company/dashboard/${this.props.user.user.user_id}`,
        profile: `/profile/company/${this.props.user.user.user_id}`,
        editProfile: `/profile/company/edit/${this.props.user.user.user_id}`,
        search: `/search`,
        profilepic: this.props.profile.profile[0].picture,
        watchAdd: '/newjob',
        watchAddIcon:'plus square'
      }})
    } else{
      this.setState({links:{
        dashboard: `/profile/dev/dashboard/${this.props.user.user.user_id}`,
        profile: `/profile/dev/${this.props.user.user.user_id}`,
        editProfile: `/profile/dev/edit/${this.props.user.user.user_id}`,
        search: `/search`,
        profilepic: this.props.profile.profile[0][0].profilepic,
        watchAdd: '/watchlist',
        watchAddIcon: 'star'
      }})
    }
    }

  }
  componentWillMount(){

  }
  render() {
    const trigger = (
      <span>
      <Image size="mini" shape='circular' src={this.state.links.profilepic || 'http://plumtri.org/sites/all/themes/plumtritheme/images/default_profile.jpg'} />
      </span>
    )
    return (
      <div>
        <Menu className='navbar' color='grey' inverted borderless icon secondary>
          <Menu.Item
            name='logo'
            onClick={()=>browserHistory.push(this.state.links.dashboard)}
          >
            <Image src={Logo} size="mini"/>
          </Menu.Item>
          <Menu.Item
            position="left"
            name='devFinder'
            onClick={()=>browserHistory.push(this.state.links.dashboard)}
          >
            Dev Finder
          </Menu.Item>
          <Menu.Item
            position="right"
            name='search'
            onClick={()=>browserHistory.push(this.state.links.search)}
          >
            <Icon name='search' />
          </Menu.Item>
          <Menu.Item
            onClick={()=>browserHistory.push(this.state.links.watchAdd)}
            name='watchlist'
          >
            <Icon name={this.state.links.watchAddIcon} />
          </Menu.Item>
          <Menu.Item
            name='messages'
            onClick={()=>browserHistory.push('/messaging')}
          >
            <Icon name='mail' />
          </Menu.Item>
          <Menu.Item>

            <Dropdown trigger={trigger} icon={null} >
              <Dropdown.Menu>
                <Dropdown.Item content='Profile' icon='user' onClick={()=>browserHistory.push(this.state.links.profile)}/>
                <Dropdown.Item content='Edit Profile' icon='settings' onClick={()=>browserHistory.push(this.state.links.editProfile)}/>
                <Dropdown.Item content='Log Out' icon='sign out' onClick={()=>this.logOut().then(()=>browserHistory.push('/'))}/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <div>{React.cloneElement(this.props.children, this.props)}</div>
      </div>
    );
  }
  componentWillReceiveProps(){

    this.setLinks()
  }
}

export default App;
