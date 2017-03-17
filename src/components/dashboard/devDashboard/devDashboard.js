import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react';
import axios from 'axios';
import './devDashboard.css';


class DevDashboard extends Component {

  constructor(){
    super();
    this.state = {
      flagged: [],
      apps: [],
      newjobs: []
    };
    this.getFlagged = this.getFlagged.bind(this);
    this.getApplications = this.getApplications.bind(this);
    this.getJobs = this.getJobs.bind(this);
  }

  getFlagged = ()=>{
    return axios.get(`/api/flaggedJobs`).then(flagged => flagged.data)
  }
  getApplications = ()=>{
    return axios.get(`/api/applications`).then(apps => apps.data)
  }
  getJobs = ()=>{
    return axios.get(`/api/newjobs`).then(newjobs => newjobs.data)

  }


  render(){
    return(
      <div>
        <h1>Dev Dashboard</h1>
        <div className='flaggedsection'>
          <h1>Flagged Jobs</h1>
            {this.state.flagged.map((f, i) => {
              return (
                <div className='oneJob'>
                <p> company name: {f.name}</p>
                <p> job title: {f.job_title}</p>
                <p> location: {f.location}</p>
                <p> job desc: {f.job_description}</p>
                <hr/>
                </div>
                     )
                   })}
        </div>
        <div className='applicationsection'>
          <h1>applied jobs</h1>
            {this.state.apps.map((a, i) => {
              return (
                <div className='oneJob'>
                <p> job title: {a.job_title}</p>
                <p> location: {a.location}</p>
                <p> job desc: {a.job_description}</p>
                <p> date posted: {a.timestamped}</p>
                <hr/>
                </div>
                     )
                   })}
        </div>
        <div className='jobsection'>
          <h1>new job postings</h1>
            {this.state.newjobs.map((n, i) => {
              return (
                <div className='oneJob'>
                <p> date posted: {n.timestamped}</p>
                <p> job title: {n.job_title}</p>
                <p> location: {n.location}</p>
                <p> job desc: {n.job_description}</p>
                <hr/>
                </div>
                     )
                   })}
        </div>
      </div>
    )
  }

componentDidMount() {
    this.getFlagged().then(flagged => {
      this.setState({flagged: flagged})
      console.log(flagged)
    })
    this.getApplications().then((apps) => {
      this.setState({apps: apps})
      console.log(apps);
    })
    this.getJobs().then((newjobs) => {
      this.setState({newjobs: newjobs})
      console.log(newjobs);
    })
  }
}

export default DevDashboard
