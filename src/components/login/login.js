import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button} from 'semantic-ui-react'
import axios from 'axios'
import './login.css';


class Login extends Component{
  constructor(){
    super()
    this.state = {
    }
    this.login = this.login.bind(this)
  }
  login = ()=>{
    return axios.post('/api/login', {
      username: this.usernameInput,
      password: this.passwordInput
    }).then((r)=>{
      console.log(r);
      let user = r.data
      user.company ? browserHistory.push(`/profile/company/edit/${user.user_id}`) : browserHistory.push(`/profile/dev/edit/${user.user_id}`)
    })
  }
  render(){
    return(
      <div>
        <h1>Login</h1>
          <Input
            placeholder='Username'
            onChange={(e)=>this.usernameInput = e.target.value}
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={(e)=>this.passwordInput = e.target.value}
           />
         <Button content='Login' color="teal" onClick={()=>this.login()}/>
         <Button content='Sign Up' color="orange" onClick={()=>browserHistory.push('/signup')} />
      </div>
    )
  }
}

export default Login
