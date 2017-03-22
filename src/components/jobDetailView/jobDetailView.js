import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Button, Icon} from 'semantic-ui-react';
import { getjob } from './../../services/jobinfo'
import './jobDetailView.css';
import axios from 'axios';

class jobDetails extends Component{

  constructor(){
    super();


    this.state = {
      job: [{}],
      user: ""

    }
    this.applyJob=this.applyJob.bind(this)
    this.watchJob=this.watchJob.bind(this)
    this.getUserId=this.getUserId.bind(this)
  }
 applyJob = function(jobId){
    return axios.post('/api/application/'+jobId)
    .then(r=>console.log(r))
  }
  watchJob = function(jobId){
    return axios.post('/api/flagAJob/'+jobId)
  }
  getUserId = ()=>{
    var self = this;
    return axios.get('/api/me').then(response => {
      console.log(this.state.job.user_id);
        self.setState({
          user: response.data.user_id
        })
    })
  }
  
  render(){
    var self = this;
    return (
      <div className =''>
          <div className=' jobBox topJobContainer white'>
            <div>
              <img className = 'jobPic'src={this.state.job.picture}/>
              <div className = 'basicJobInfo'>
                  <h1 className='companyName'>{this.state.job.name}</h1>
              <h2 className='jobtitle'>{this.state.job.job_title}</h2>
        <h3>
          <Icon name='location arrow' color='black'></Icon>{this.state.job.location}</h3>
           <Button
           onClick={()=>this.applyJob(this.state.job.id)}>
           Apply
           </Button>
           <Button
             onClick={()=>this.watchJob(this.state.job.id)}>
             Save
             </Button>
             <Button onClick={()=>self.getUserId()}>
               Message
               </Button>
           <br/>
           <h4> This job was listed on {this.state.job.timestamped}</h4>
           {this.state.job.skills? this.state.job.skills.skills.map((s,i)=>{

             return(<div>{s}</div>)
           }) :''}
              </div>


            </div>
          </div>

      <div className = ' jobBox white'>
<h1 className = 'center'>
  Job Description
</h1>

        <h4>{this.state.job.job_description}</h4>
      </div>

          </div>
    )
  }
  componentDidMount() {
    getjob(this.props.params.id).then(job => {
      this.setState({
        job: job[0]

      })
    })
    }
}

export default jobDetails
