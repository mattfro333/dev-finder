import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Form, Radio} from 'semantic-ui-react';
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
     <div className='jobSearch background'>
       <div className='left-pane white refineSearch'>
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
         className='searchBar'

         />
         {(()=>{
           if(this.state.value === 'Jobs'){
            return (<div>
                    <Button
                      color='orange'
                      className='searchButton'
                      onClick={()=>this.getJob()}
                      >
                      Find my Job!
                    </Button>
                  </div>)
           }
           else if(this.state.value === 'Companies'){
               return (<div>
                    <Button
                      color='orange'
                      className='searchButton'
                      onClick={()=>this.getCompanies()}
                      >
                      Find my Company!
                    </Button>
                  </div>)
           }
            else if(this.state.value === 'Developers'){
               return (<div>
                    <Button
                      color='orange'
                      className='searchButton'
                      onClick={()=>this.getDevelopers()}
                      >
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
             <div className="SearchResultsJobsContainer">
                   <h1
                   className='hoverTeal'
                   type='link'
                   onClick={
                     ()=>browserHistory.push(`/jobdetails/${j.id}`)
                     }
                   >
                   {j.job_title}
                   </h1>
                 <h3
                 className='hoverOrange'
                 onClick={
                   ()=>browserHistory.push(`/profile/company/${j.user_id}`)
                   }
                 >
                 {j.name}
               </h3>
                 <p>{j.location}</p>
                 <Button color='teal'
                  onClick={()=>browserHistory.push(`/jobdetails/${j.id}`)}
                  >View Job</Button>
                   <Button
                   color='orange'
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
                <img className='companySearchPicture' src={c.picture} alt=""/>
                <h1 className='companySearchName hoverTeal' onClick={()=>browserHistory.push(`/profile/company/${c.user_id}`)}>{c.name}</h1>
                <hr/>
              </div>
            )
           })
         }
         {
           this.state.devs.map((d, i)=>{
             return(
               <div>
                 <img  className='dev-search-photo'src={d.profilepic} alt=""/>
                 <h1 className='hoverTeal' onClick={()=>browserHistory.push(`/profile/dev/${d.user_id}`)}>{d.firstname} {d.lastname}</h1>
                 <h2>{d.city}, {d.state}</h2>
                 <hr/>
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
