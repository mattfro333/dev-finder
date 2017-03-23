import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Button} from 'semantic-ui-react'
import './compProfile.css';
import { getCompanyProfile } from '../../../services/companyProfile.js';
import axios from 'axios';

class CompProfile extends Component{
  constructor(){
    super();

    this.state = {
      company: [{}],
      id: 0,
      userName: "",
      jobs: [{}]
    }
    this.createRoom = this.createRoom.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.getUserId=this.getUserId.bind(this)
    this.getJobs = this.getJobs.bind(this)
  }

  createRoom = ()=>{
    var self = this;
    return axios.post('/api/newRoom', {user1_id: this.state.id, user2_id: parseInt(this.state.company[0].user_id), user1_name: this.state.userName, user2_name: this.state.company[0].name}).then(response => {
        browserHistory.push('/messages')
    })
  }
  getUserId = ()=>{
    var self = this;
    return axios.get('/api/me').then(response => {
      //console.log(response.data.user_id, this.state.job, this.state.job.name);
        self.setState({
          id: response.data.user_id
        })
    })
  }
  getUserName = ()=>{
    var self = this;
    return axios.post('/api/name').then(response => {
      console.log(response.data[0].firstname + " " + response.data[0].lastname);
      self.setState({
        userName: response.data[0].firstname + " " + response.data[0].lastname
      })
    })
  }

  getJobs = (company_id)=>{
    return axios.get('/api/company/jobs/'+company_id).then(r =>{
      console.log('jobs',r.data)
      this.setState({
        jobs:r.data
      })
    })
  }



  render(){
    var self = this;
    return(
      <div className = 'body'>
        <div className='main-info'>
          <div className = 'left-pane white'>
            <div className='prof-pic'>
          <img className='pic' src={this.state.company[0].picture}/>
          </div>
          <div className='info'>
            <h1>{this.state.company[0].name}</h1>
            <h2>Reviews</h2>
            <h3>Founded: {this.state.company[0].founded}</h3>
            <h3><Button onClick={()=>self.createRoom()}>
              Message
              </Button></h3>
          </div>

          </div>
          <div className = 'right-pane white'><h1>Company Bio: </h1>

          <p>{this.state.company[0].description}</p>


           </div>
            <div className=' right-pane white'>
<h1>Jobs at {this.state.company[0].name}</h1>
<hr/>
              {
                this.state.jobs.map((j, i)=>{
                  return (
                    <div>
                      <div onClick ={()=>browserHistory.push(`/jobdetails/${j.id}`)}><h1>{j.job_title}</h1>
                      {j.location}</div>
                      
                      <hr/>

                    </div>
                  )
                })
              }

            </div>

        </div>
      </div>

    )
  }
   componentDidMount() {
     var self=this
    getCompanyProfile(this.props.params.userid).then(company => {
      this.setState({
        company: company

      })
      console.log(company[0]);
      console.log('this the id u need:', company[0].company_id)
      return company[0].company_id
    }).then(function(company_id){
      self.getJobs(company_id)
    })
    this.getUserName();
    this.getUserId();
  }
}

export default CompProfile
