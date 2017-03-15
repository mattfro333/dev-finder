import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu,Input, Button} from 'semantic-ui-react'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'
import axios from 'axios'
import './devSignup.css';


class DevSignUp extends Component{

constructor(){
  super();
  this.state = {};
  this.CreateUser = this.CreateUser.bind(this);
  this.getUserId = this.getUserId.bind(this);
}
CreateUser = ()=>{
  console.log('clicked');
  return axios.post('/api/createdev', {firstname: this.devFirstName, lastname: this.devLastName, email: this.devEmail, city: this.devCity, state: this.devState, desc: this.devDesc, type: this.devType})
}
componentWillMount(){
  this.getUserId().then((response) => this.setState({user:response}))
  console.log(this.state.user);
}
getUserId = ()=>{
  return axios.get('/api/me')
}

  render(){
    return(
      <div>
        <h1>DevSignUp</h1>
        <div>
        <Input placeholder='First Name' onChange={(e)=>this.devFirstName = e.target.value} />
        <Input placeholder='Last Name' onChange={(e)=>this.devLastName = e.target.value}/>
        <Input placeholder='Position' onChange={(e)=>this.devType = e.target.value}/>
        <Input placeholder='Email' onChange={(e)=>this.devEmail = e.target.value} />
        <Input placeholder='City' onChange={(e)=>this.devCity = e.target.value} />
        <Input placeholder='State' onChange={(e)=>this.devState = e.target.value} />
        <Input placeholder='Desc' onChange={(e)=>this.devDesc = e.target.value} />
        <Button content='Update' onClick={()=>this.CreateUser()}/>
        <Button content='Go To Dashboard' onClick={()=>browserHistory.push
          ('/dashboard-dev')}/>
      </div>
    </div>
    )
  }
}

export default DevSignUp
