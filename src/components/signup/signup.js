import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {Input, Button, Form, Radio, Checkbox, Header, Segment, Divider, Icon, Image} from 'semantic-ui-react'
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
      <Form className="signupMove">
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
          <div className="radioButtons">
          <Form.Field>
          <Radio className="radioDev"
            label='Company'
            name='company'
            value={true}
            checked={this.state.value === true}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
            <Radio className="radioCom"
              label='Developer'
              name='company'
              value={false}
              checked={this.state.value === false}
              onChange={this.handleChange}
            />
          </Form.Field>
          </div>
          <Button type='submit' onClick={()=>this.postUser()}><Link to="/login">Submit</Link></Button>
      </Form>

      <footer className="signfooter">
               <Segment inverted className="signfooter">
                     <inverted />
                     <Divider horizontal inverted className='dottitle' >.</Divider>
                   </Segment>
                   </footer>
                   <Header textAlign='center'>
                       <Image className="signinvert" src={Logo} size='tiny'/>
                 </Header>
</div>
    )
  }
}

export default SignUp
