import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Form, Radio, Label} from 'semantic-ui-react'
import axios from 'axios'
import './signup.css';



class SignUp extends Component{
  constructor(){
    super()
    this.state = {
      show: false
    }
    this.postUser = this.postUser.bind(this)
    this.checkPasswords = this.checkPasswords.bind(this)
  }
  handleChange = (e, { value }) => this.setState({ value })

  postUser = () => {
     return axios.post('/api/register', {username: this.usernameInput,
     password: this.passwordInput,
     company: this.state.value})
  }
  checkPasswords = () => {
    if(this.passwordInput === this.confirmPasswordInput){
      this.postUser().then(()=> browserHistory.push('/login'))
    }
    else{
      this.setState({show: true})
    }
  }
  render(){
    return(
        <div>
          <div className='land-nav'>
            <div className='logo'></div>
            <div className='landing-buttons'>
               <Button
               color='orange'
               onClick={()=> browserHistory.push('/login')}>Login

               </Button>
            </div>
          </div>

          <div className='landing-page'>
            <div className='black-shadow center-login'>
              <div className='logIn white signup'>
                <h1>Sign Up</h1>
            <Form>
              <Form.Field inline>
                <Input
                className='username-input'
                placeholder='Username'
                onChange={(e)=>this.usernameInput = e.target.value}
                />
                {this.state.show ? <Label basic color='red' pointing='below'>The passwords do not match</Label> : null}
              </Form.Field>
            </Form>

            <Input
              className='password-input'
              placeholder='Password'
              type="password"
              onChange={(e)=>this.passwordInput = e.target.value}
              onClick={()=>this.setState({show:false})}
            />
            <Input
              className='password-input'
              placeholder='Confirm Password'
              type="password"
              onChange={(e)=>this.confirmPasswordInput = e.target.value}
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
            <br/><div className='buffer'></div>
          <Button className='getstarted'color='teal'onClick={()=>this.checkPasswords()}>Get Started</Button>
          </div>
          </div>
          </div>

</div>
    )
  }
}

export default SignUp
