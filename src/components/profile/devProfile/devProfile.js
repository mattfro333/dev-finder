import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile'
import {Menu} from 'semantic-ui-react'
import './devProfile.scss';

class DevProfile extends Component{

  constructor(){
    super();

    this.state = {
      dev: []
    }
  }

  render(){
    return(
      <div>
        <div className='topContainer'>
          <div className='profilePic'></div>
            <p>name</p>
            <p>Bio</p>
            <p>Location</p>
        </div>
        <div className='leftInfoBar'>
          <div className=''><a>email</a></div>
          <div className=''><a>Message</a></div>
          <div className=''><a>github</a></div>
          <div className=''><a>twitter</a></div>
          <div className=''><a>interest</a></div>
          <div className='technologys'>
            <ul>
              <li>item1</li>
              <li>item2</li>
            </ul>
          </div>
        </div>
        <div className='rightResume'>
          <div className='portfolioSection'>

          </div>
          <div className='educationSection'>

          </div>
          <div className='workSection'>

          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    getprofile().then(dev => {
      this.setState({
        dev: dev

      })
      console.log(dev);
    })
  }
}

export default DevProfile
