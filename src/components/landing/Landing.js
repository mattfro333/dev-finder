import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Container, Header, Segment, Divider, Icon, Image} from 'semantic-ui-react'
import axios from 'axios'
import './Landing.css';
import Piechart from '../d3/Piechart.js'




class Landing extends Component{



  render(){
    return(
    <div>
     <div className= 'land-nav'>
       <div className='logo'></div>
       <div className = 'landing-buttons'>
         <Button color='orange'onClick={()=> browserHistory.push('/login')}>Login</Button>
         <Button color='teal' onClick={()=> browserHistory.push('/signup')}>Sign-up</Button>
       </div>
     </div>
      <div className= 'landing-page'>
        <div className= 'black-shadow'>
          <div className = 'landing-text'>
                <h1>{'{'}<span className='blue'>employed</span>=<span className='orange'>true</span>}</h1>
        <h2>By Developers. For Developers.</h2>
        <h3>Sign up today to find your next employment opportunity.</h3>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Landing;
