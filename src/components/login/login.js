import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button} from 'semantic-ui-react'
import './login.css';


class Login extends Component{
  render(){
    return(
      <div>
        <h1>Login</h1>
          <Input placeholder='Username'/>
          <Input placeholder='Password'/>
          <Button content='Login' color="teal" />
          <Button content='Sign Up' color="orange" onClick={()=>browserHistory.push('/signup')} />
      </div>
    )
  }
}

export default Login
