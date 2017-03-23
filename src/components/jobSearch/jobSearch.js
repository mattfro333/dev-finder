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
      jobs:[],
      value: 'Jobs',
      devs:[],
      companies:[]
    }
    this.getJob=this.getJob.bind(this)
    this.applyJob=this.applyJob.bind(this)
    this.watchJob=this.watchJob.bind(this)
    this.getCompanies=this.getCompanies.bind(this)
    this.getDevelopers=this.getDevelopers.bind(this)
  }
  handleChange = (e, { value }) => this.setState({ value })

  //job functions
  getJob = function(){
     this.setState({
      devs:[],
      companies:[]
    })
    return axios.get('/api/jobs/'+this.mySearch)
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

  //developer functions
getDevelopers=function(){
   this.setState({
      jobs:[],
      companies:[]
    })
  return axios.get('/api/developers/'+this.mySearch).then(r=>{
    console.log(r.data)
    this.setState({
      devs:r.data
    })
  })
}
  //company functions
  getCompanies=function(){
    this.setState({
      jobs:[],
      devs:[]
    })
    return axios.get('/api/companies/'+this.mySearch).then(r=>{
      console.log(r.data)
      this.setState({
        companies:r.data
      })
    })
  }
  render(){
    return(
     <div className='jobSearch'>
       <div className='left-pane white'>
        <h1>Refine your Search</h1>
        <Form>
            <Form.Field>
            <Radio
            label='Jobs'
            value={'Jobs'}
            checked={this.state.value === 'Jobs'}
            onChange={this.handleChange}>
            </Radio>
          </Form.Field>
          <Form.Field>
            <Radio
             label='Companies'
             value={'Companies'}
             checked={this.state.value === 'Companies'}
             onChange={this.handleChange}
            >
            </Radio>
          </Form.Field>
          <Form.Field>
            <Radio 
            label='Developers'
            value={'Developers'}
             checked={this.state.value === 'Developers'}
             onChange={this.handleChange}
            >
            </Radio>
          </Form.Field>
        </Form>
       </div>
       <div className='white right-pane'>
         <Input
          onChange={(e)=>this.mySearch = e.target.value}
         icon='search'
         placeholder='Search...'
         fluid
         />
         {(()=>{
           if(this.state.value === 'Jobs'){
            return (<div>
                    <Button
                      onClick={()=>this.getJob()}
                      primary>
                      Find my Job!
                    </Button>
                  </div>)
           }
           else if(this.state.value === 'Companies'){
               return (<div>
                    <Button
                      onClick={()=>this.getCompanies()}
                      primary>
                      Find my Company!
                    </Button>
                  </div>)
           }
            else if(this.state.value === 'Developers'){
               return (<div>
                    <Button
                      onClick={()=>this.getDevelopers()}
                      primary>
                      Find me a Developer!
                    </Button>
                  </div>)
           }
         })()
         }



        
       </div>
       <div className='white right-pane'>
         <h1></h1> 
         {this.state.jobs.map((j, i)=>{
           return(
             <div>
                   <h1 type='link'
                   onClick={()=>browserHistory.push(`/jobdetails/${j.id}`)}
                   >{j.job_title}</h1>
                 <h2
                 onClick={()=>browserHistory.push(`/profile/company/${j.user_id}`)}
                 >{j.name}</h2>
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
         {
           this.state.companies.map((c, i)=>{
            return(
              <div>
                <h1 onClick={()=>browserHistory.push(`/profile/company/${c.user_id}`)}>{c.name}</h1>
              </div>
            )
           })
         }
         {
           this.state.devs.map((d, i)=>{
             return(
               <div>
                 <h1 onClick={()=>browserHistory.push(`/profile/dev/${d.user_id}`)}>{d.firstname} {d.lastname}</h1>
               </div>
             )
           })
         }

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
