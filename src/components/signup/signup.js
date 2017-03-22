import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {Input, Button, Form, Radio} from 'semantic-ui-react'
import Logo from './../../DevFinder.png'
import axios from 'axios'
import './signup.css';



class SignUp extends Component{
  constructor(){
    super()
    this.state = {
    }
    this.postUser = this.postUser.bind(this)
  }
  handleChange = (e, { value }) => this.setState({ value })

  postUser = () => {
     return axios.post('/api/register', {username: this.usernameInput,
     password: this.passwordInput,
     company: this.state.value})
  }
  render(){
    return(
        <div>
          <div className= 'land-nav'>
            <div className='logo'></div>
            <div className= 'landing-buttons'>
               <Button
               color='orange'
               onClick={()=> browserHistory.push('/login')}>Login

               </Button>
            </div>
          </div>

          <div className = 'landing-page'>
            <div className = 'black-shadow center-login'>
              <div className = 'logIn white signup'>
                <h1>Sign Up</h1>
            <Input
              className='username-input'
              placeholder='Username'
              onChange={(e)=>this.usernameInput = e.target.value}
              />
            <Input
              className='password-input'
              placeholder='Password'
              type="password"
              onChange={(e)=>this.passwordInput = e.target.value}
              /><br/>
          <Radio className="radioCom"
            label='Company'
            name='company'
            value={true}
            checked={this.state.value === true}
            onChange={this.handleChange}
          />
            <Radio className="radioDev"
              label='Developer'
              name='company'
              value={false}
              checked={this.state.value === false}
              onChange={this.handleChange}
            />
            <br/><div className= 'buffer'></div>
          <Button className= 'getstarted'color='teal'onClick={()=>this.postUser().then(()=> browserHistory.push('/login'))}>Get Started</Button>
          </div>
          </div>
          </div>

</div>
    )
  }
}

export default SignUp
