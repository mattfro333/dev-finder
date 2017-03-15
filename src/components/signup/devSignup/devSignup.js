import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu,Input, Button} from 'semantic-ui-react'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'
import config from './../../../../server/config'
import axios from 'axios'
import './devSignup.css';
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderS3({
  options: {
    chunking: {
      enabled: false
    },
    request: {
      endpoint: 'https://devfinder.s3.amazonaws.com',
      accessKey: config.accessKey
    },
    cors: {
       //all requests are expected to be cross-domain requests
       expected: true,
   },
    retry: {
      enableAuto: true
    },
    signature:{
      endpoint: '/s3handler'
    },
    uploadSuccess:{
      endpoint: '/s3handler?success=true'
    }
  }
})

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
  this.getUserId().then((r) => this.setState({user: r.data}))
}
getUserId = ()=>{
  return axios.get('/api/me')
}

  render(){
    return(
      <div>
        <h1>UpdateDevProfile</h1>
        <div>
        <h2>Add Profile Image</h2>
        <Gallery uploader={uploader} />
        <Input placeholder='First Name' onChange={(e)=>this.devFirstName = e.target.value} />
        <Input placeholder='Last Name' onChange={(e)=>this.devLastName = e.target.value}/>
        <Input placeholder='Position' onChange={(e)=>this.devType = e.target.value}/>
        <Input placeholder='Email' onChange={(e)=>this.devEmail = e.target.value} />
        <Input placeholder='City' onChange={(e)=>this.devCity = e.target.value} />
        <Input placeholder='State' onChange={(e)=>this.devState = e.target.value} />
        <Input placeholder='Desc' onChange={(e)=>this.devDesc = e.target.value} />
        <Button content='Update' onClick={()=>this.CreateUser()}/>
        <Button content='Go To Dashboard' onClick={()=>browserHistory.push
          (`/profile/dev/dashboard/${this.state.user.user_id}`)}/>
      </div>
    </div>
    )
  }
}

export default DevSignUp
