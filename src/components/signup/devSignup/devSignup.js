import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Dropdown} from 'semantic-ui-react'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'
// import config from './../../../../server/config'
import axios from 'axios'
import './devSignup.css';
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderS3({
  options: {
    chunking: {
      enabled: false
    },
    request: {
      endpoint: 'https://dev-finder.s3.amazonaws.com',
      accessKey: process.env.accessKey
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
  return axios.put('/api/updatedev', {firstname: this.devFirstName, lastname: this.devLastName, email: this.devEmail, city: this.devCity, state: this.devState, desc: this.devDesc, type: this.devType, github: this.devGithub, codewars: this.devTwitter, skills: this.devSkills})
}
componentWillMount(){
  this.getUserId().then((r) => this.setState({user: r.data}))
  console.log(this.props.skills.skills)
}
getUserId = ()=>{
  return axios.get('/api/me')
}

  render(){
    return(
      <div className="devSignupbody">
        <h1>Update DevProfile</h1>
        <div>
        <h2>Add Profile Image</h2>
        <div className="devEditUploader">
        <Gallery uploader={uploader} />
        </div>
        <div className="devEditInputs1">
        <Input placeholder='First Name' onChange={(e)=>this.devFirstName = e.target.value} />
        <Input placeholder='Last Name' onChange={(e)=>this.devLastName = e.target.value}/>
        <Input placeholder='Position' onChange={(e)=>this.devType = e.target.value}/>
        <Input placeholder='Email' onChange={(e)=>this.devEmail = e.target.value} />
</div>
  <div className="devEditInputs1">
        <Input placeholder='City' onChange={(e)=>this.devCity = e.target.value} />
        <Input placeholder='State' onChange={(e)=>this.devState = e.target.value} />
        <Input placeholder='Github' onChange={(e)=>this.devGithub = e.target.value} />
        <Input placeholder='Twitter' onChange={(e)=>this.devTwitter = e.target.value} />
        <Input placeholder='Desc' onChange={(e)=>this.devDesc = e.target.value} />
        <Dropdown placeholder='Skills' fluid multiple search selection options={this.props.skills.skills}  onChange={(e, d)=>{
          this.devSkills = {skills: d.value}
          console.log(this.devSkills);
        }}/>
</div>
<div className="devEditInputs">

        <Button className='signupButton' content='Update' onClick={()=>this.CreateUser()}/>
        <Button className='signupButton' content='Go To Dashboard' onClick={()=>browserHistory.push
          (`/profile/dev/dashboard/${this.state.user.user_id}`)}/>
          </div>
      </div>
    </div>

    )
  }
}

export default DevSignUp
