import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button} from 'semantic-ui-react';
import './jobSearch.css';
import axios from 'axios';

class JobSearch extends Component{
  constructor(){
    super()
    this.state={
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
                  onClick={()=>this.applyJob(j.id)}
                  >Apply</Button>
                   <Button
                  onClick={()=>this.watchJob(j.id)}
                  >Pin</Button>
                  <hr/>
             </div>
          
           )
         })}
     

       </div>
      </div>
    )
  }
}

export default JobSearch
