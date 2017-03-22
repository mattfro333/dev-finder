import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button, Form, Radio} from 'semantic-ui-react';
import './jobSearch.css';
import axios from 'axios';
import Alert from '../SweetAlert/SweetAlert'


class JobSearch extends Component{
  constructor(){
    super()
    this.state={
      showApplyAlert: false,
      showPinAlert: false,
      jobs:[]
    }
    this.getJob=this.getJob.bind(this)
    this.applyJob=this.applyJob.bind(this)
    this.watchJob=this.watchJob.bind(this)
  }
  getJob = function(){
    return axios.get('/api/jobs/'+this.myJob)
    .then(r=>{
      console.log(r.data)
      this.setState({
        jobs:r.data
      })
    })
  }
  applyJob = function(jobId){
    return axios.post('/api/application/'+jobId)
    .then(r=>console.log(r))
  }
  watchJob = function(jobId){
    return axios.post('/api/flagAJob/'+jobId)
  }
  render(){
    return(
     <div className='jobSearch'>
       <div className='left-pane white'>
        <h1>Refine your Search</h1>
          <Form>
            <Form.Field>
              Selected value: <b>{this.state.value}</b>
            </Form.Field>
            <Form.Field>
              <Radio
                label="Developers"
                name="radioGroup"
                value='this'
                checked={this.state.value === 'this'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Companys"
                name='radioGroup'
                value='that'
                checked={this.state.value === 'that'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Jobs"
                name='radioGroup'
                value='other'
                checked={this.state.value === 'other'}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form>
       </div>
       <div className='white right-pane'>
         <Input
          onChange={(e)=>this.myJob = e.target.value}
         icon='search'
         placeholder='Search...'
         fluid
         />
         <Button
         onClick={()=>this.getJob()}
         primary>Find my Job!</Button>
       </div>
       <div className='white right-pane'>
         <h1></h1>
         {this.state.jobs.map((j, i)=>{
           return(
             <div>
                   <h1 type='link'
                   onClick={()=>browserHistory.push(`/jobdetails/${j.id}`)}
                   >{j.job_title}</h1>
                 <h2>{j.name}</h2>
                 <p>{j.location}</p>
                 <Button color='teal'
                  onClick={()=>{
                    this.setState({showApplyAlert: true})
                    this.applyJob(j.id)}}
                  >Apply</Button>
                   <Button
                  onClick={()=>{
                    this.setState({showPinAlert: true})
                    this.watchJob(j.id)}}
                  >Pin</Button>
                  <hr/>
             </div>

           )
         })}

<Alert
  onConfirm={()=>this.setState({showApplyAlert:false})}
  show={this.state.showApplyAlert}
  alertTitle='Congratulations!'
  alertText="You've applied for this job"/>

  <Alert
  onConfirm={()=>this.setState({showPinAlert:false})}
  show={this.state.showPinAlert}
  alertTitle='Pinned!'
  alertText="This job is now on your dashboard."/>
       </div>
      </div>
    )
  }
}

export default JobSearch
