import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Form, Radio, Checkbox} from 'semantic-ui-react'
import axios from 'axios'
import './signup.scss';


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
     company: this.state.value}).then((r)=>console.log(r))
  }
  render(){
    return(
      <Form>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder='Username'
              onChange={(e)=>this.usernameInput = e.target.value}
              />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              type="password"
              onChange={(e)=>this.passwordInput = e.target.value}
              />
          </Form.Field>
          <Form.Field>
          <Radio
            label='Company'
            name='company'
            value={true}
            checked={this.state.value === true}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Developer'
              name='company'
              value={false}
              checked={this.state.value === false}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit' onClick={()=>this.postUser()}>Submit</Button>
      </Form>
    )
  }
}

export default SignUp
