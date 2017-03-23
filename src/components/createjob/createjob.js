import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import axios from 'axios'
import Alert from './../SweetAlert/SweetAlert'
import {Input, Button, Form, Radio, Checkbox, Dropdown, TextArea} from 'semantic-ui-react'

import './createjob.css';

class CreateJob extends Component{

  constructor(){
    super();
    this.CreateJob = this.CreateJob.bind(this);

    this.state = {
      dev: {},
      showAlert: false
    }
  }
    CreateJob = ()=>{
      var currentDate = new Date()
      console.log(currentDate);
      return axios.post('/api/createjob', {jobtitle: this.jobtitle, jobdesc: this.jobdesc, city: this.city, state: this.state, time: currentDate, skills: this.jobSkills})
    }
  render(){
    return(
      <div className='job-create-page'>
        <div className='center-login'>
          <div className='createJobForm'>
          <h1>Create Job</h1>
          <Input fluid placeholder='Job Title' onChange={(e)=>this.jobtitle = e.target.value} /><br/>
          <TextArea className ='textbox'placeholder='Job Desc' onChange={(e)=>this.jobdesc = e.target.value}/><br/>
          <Input className = 'halfy' placeholder='City' onChange={(e)=>this.city = e.target.value}/>
          <Input  className = 'halfy'placeholder='State' onChange={(e)=>this.state = e.target.value}/><br/>
          <Dropdown  placeholder='Skills' fluid multiple search selection options={this.props.skills.skills}  onChange={(e, d)=>{
            this.jobSkills = {skills: d.value}
            console.log(this.jobSkills);
          }}/>
        <br/>
          <Button className='left'color='teal' content='Create Job' onClick={()=>this.CreateJob()}/>
          <Button className='right' color='orange'content='Go To Dashboard' onClick={()=>browserHistory.push
            (`/profile/company/dashboard/${this.state.user.user_id}`)}/>
        </div>
        </div>
      <Alert show={this.state.showAlert} onConfirm={()=>{
        this.setState({showAlert: false})
        browserHistory.push(`/profile/company/dashboard/${this.props.user.user.user_id}`)
      }} alertTitle='Job Created!'
      alertText=''/>
      </div>
    )
  }
  componentDidMount() {

  }
}

export default CreateJob
