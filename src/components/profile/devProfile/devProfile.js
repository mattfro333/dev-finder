import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile'
import {Menu} from 'semantic-ui-react'
import './devProfile.scss';

class DevProfile extends Component{

  constructor(){
    super();

    this.state = {
      dev: {}
    }

  }

  render(){
    return(
      <div>
        <div className='topContainer'>
          <div className='profilePic'></div>
            <p>{this.state.dev.firstname || 'Loading'} {this.state.dev.lastname}</p>
            <p>bio:{this.state.dev.description}</p>
            <p>Location:{this.state.dev.city}, {this.state.dev.state}</p>
        </div>
        <div className='leftInfoBar'>
          <div className=''><a>{this.state.dev.email || 'Loading'}</a></div>
          <div className=''><a><button>Message</button></a></div>
          <div className=''><a href='{this.state.dev.github}'>Github</a></div>
          <div className=''><a href='{this.state.dev.twitter}'>Github</a></div>
          <div className='technologies'>
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
        dev: dev[0]

      })
      console.log(dev);
    })
  }
}

export default DevProfile
