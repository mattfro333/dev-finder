import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import axios from 'axios'
import {Input, Button, Form, Radio, Checkbox, Dropdown} from 'semantic-ui-react'
import './createjob.css';

class CreateJob extends Component{

  constructor(){
    super();
    this.CreateJob = this.CreateJob.bind(this);

    this.state = {
      dev: {}
    }
  }
    CreateJob = ()=>{
      var currentDate = new Date()
      console.log(currentDate);
      return axios.post('/api/createjob', {jobtitle: this.jobtitle, jobdesc: this.jobdesc, city: this.city, state: this.state, time: currentDate, skills: this.jobSkills})
    }

  render(){
    return(
      <div>
        <h1>Create Job</h1>
        <div>
          <div>
          <Input placeholder='Job Title' onChange={(e)=>this.jobtitle = e.target.value} />
          <Input placeholder='Job Desc' onChange={(e)=>this.jobdesc = e.target.value}/>
          <Input placeholder='City' onChange={(e)=>this.city = e.target.value}/>
          <Input placeholder='State' onChange={(e)=>this.state = e.target.value}/>
          <Dropdown placeholder='Skills' fluid multiple search selection options={this.props.skills.skills}  onChange={(e, d)=>{
            this.jobSkills = {skills: d.value}
            console.log(this.jobSkills);
          }}/>
          <Button content='Create Job' onClick={()=>this.CreateJob()}/>
          <Button content='Go To Dashboard' onClick={()=>browserHistory.push
            (`/profile/company/dashboard/${this.state.user.user_id}`)}/>
        </div>
        </div>

      </div>
    )
  }
  componentDidMount() {

  }
}

export default CreateJob
