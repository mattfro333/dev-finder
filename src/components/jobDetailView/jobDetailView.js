import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react';
import { getjob } from './../../services/jobinfo'
import './jobDetailView.css';

class jobDetails extends Component{

  constructor(){
    super();


    this.state = {
      job: [{}]
    }
  }

  render(){

    return (
      <div>
        <h1>Job Details</h1>
          <div className='topContainer'>
            <div>
              <img src={this.state.job.picture}/>
              <p className='jobtitle'>{this.state.job.job_title}</p>
              <p className='companyName'>{this.state.job.name}</p>
            </div>
          </div>
          <div>

          job created:{this.state.job.timestamped}
           company founded: {this.state.job.founded}
          job description: {this.state.job.job_description}
          state: {this.state.job.state}
          city: {this.state.job.city}
          company description: {this.state.job.description}
          job location {this.state.job.location}
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
