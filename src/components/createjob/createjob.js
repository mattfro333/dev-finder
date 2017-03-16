import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import axios from 'axios'
import {Input, Button, Form, Radio, Checkbox} from 'semantic-ui-react'
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
      return axios.post('/api/createjob', {jobtitle: this.jobtitle, jobdesc: this.jobdesc, location: this.location, time: currentDate})
    }

  render(){
    return(
      <div>
        <h1>Create Job</h1>
        <div>
          <div>
          <Input placeholder='Job Title' onChange={(e)=>this.jobtitle = e.target.value} />
          <Input placeholder='Job Desc' onChange={(e)=>this.jobdesc = e.target.value}/>
          <Input placeholder='Location' onChange={(e)=>this.location = e.target.value}/>
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
