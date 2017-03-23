import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Table, Icon, Header, Image, Item, Divider} from 'semantic-ui-react';
import axios from 'axios';
import './devDashboard.css';
import Pie from '../../charts/pie.js'


class DevDashboard extends Component {

  constructor(props){
    super(props);
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
    return axios.get(`/api/flaggedJobs6`).then(flagged => flagged.data)
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
        <div className="companyDashboardContainer white">
          <div className='devDashboardFlaggedJobsContainer borders'>
            <h2>Pinned Jobs</h2>
              {this.state.flagged.map((f, i) => {
                return (
                  <Header as='h3'>
                     <Icon name='pin'  />
                     <Header.Content onClick={()=>browserHistory.push(`/jobdetails/${f.job_id}`)}>
                       {f.job_title}
                       <Header.Subheader>
                         {f.name}
                       </Header.Subheader>
                     </Header.Content>
                   </Header>
                       )
                     })}
          </div>
          <div className='devDashboardNewJobsContainer borders'>
            <h2>New Postings</h2>
            <Item.Group>
              {this.state.newjobs.map((a, i) => {
                return (
                  <Item key={i}>
                      <Item.Image size='tiny' src={a.picture} />

                      <Item.Content>
                        <Item.Header onClick={()=>browserHistory.push(`/jobdetails/${a.id}`)}>{a.job_title}</Item.Header>
                        <Item.Meta>
                          <span>{a.name}</span>
                          <span>{a.location}</span>
                        </Item.Meta>
                        <Item.Description>Description</Item.Description>
                      </Item.Content>
                      <Divider />
                    </Item>

                  )
                }
              )}
            </Item.Group>
                 <a className="companyDashboardBottomPageLink" onClick= {()=>browserHistory.push('/search')}>Find More Listings</a>
          </div>
          <div className='devDashboardApplicationsContainer borders'>
            <h2>Current Applications</h2>
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
              {this.state.apps.map((a, i) => {
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
                    <Table.Cell onClick={()=>browserHistory.push(`/jobdetails/${a.job_id}`)}>
                    <Header as='h4'>
                      <Header.Content>
                        {a.job_title}
                        <Header.Subheader>{a.city +', '+ a.state}</Header.Subheader>
                      </Header.Content>
                    </Header>
                    </Table.Cell>
                  </Table.Row>
                       )
                     })}
                   </Table.Body>
                 </Table>
                     <a onClick={()=>browserHistory.push(`/applications`)}
                       className="companyDashboardBottomPageLink">
                       See all Applications
                       </a>
                       <Pie />
          </div>
        </div>

      </div>
    )
  }

componentWillMount() {
    this.getFlagged().then(flagged => {
      this.setState({flagged: flagged})
    })
    this.getApplications().then((apps) => {
      console.log(apps)
      this.setState({apps: apps})
    })
    this.getJobs().then((newjobs) => {
      this.setState({newjobs: newjobs})
    })
  }
}

export default DevDashboard
