import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Table, Icon, Header, Image} from 'semantic-ui-react';
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
    return axios.get(`/api/applications?limit=true`).then(apps => apps.data)
  }
  getJobs = ()=>{
    return axios.get(`/api/newjobs`).then(newjobs => newjobs.data)

  }


  render(){
    return(
      <div className="companyDashboardPage">
        <div className="companyDashboardContainer">
          <div className='devDashboardFlaggedJobsContainer'>
            <h1>Flagged Jobs</h1>
              {this.state.flagged.map((f, i) => {
                return (
                  <div className='oneJob'>
                  <p> company name: {f.name}</p>
                  <p> job title: {f.job_title}</p>
                  <p> location: {f.location}</p>
                  <hr/>
                  </div>
                       )
                     })}
          </div>
          <div className='devDashboardApplicationsContainer'>
            <h1>applied jobs</h1>
              {this.state.apps.map((a, i) => {
                return (
                  <div className='oneJob'>
                  <p> job title: {a.job_title}</p>
                  <p> location: {a.location}</p>
                  <p> date posted: {a.timestamped}</p>
                  <hr/>
                  </div>
                       )
                     })}
          </div>
          <div className='devDashboardNewJobsContainer'>
            <h1>new job postings</h1>
            <Table celled striped >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Company
                  </Table.HeaderCell>
                  <Table.HeaderCell>Job Title</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
              {this.state.newjobs.map((a, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Header as='h4' onClick={()=>{browserHistory.push(`/profile/company/${a.company_id}`)}} image>
                        <Image src={a.picture} shape='rounded' size='mini' />
                        <Header.Content>
                          {a.name}
                          <Header.Subheader>{a.industry}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell onClick={()=>browserHistory.push(`/jobdetails/${a.id}`)}>
                    <Header as='h4'>
                      <Header.Content>
                        {a.job_title}
                        <Header.Subheader>{a.location}</Header.Subheader>
                      </Header.Content>
                    </Header>
                    </Table.Cell>
                  </Table.Row>
                       )
                     })}
                   </Table.Body>
                 </Table>
          </div>
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
