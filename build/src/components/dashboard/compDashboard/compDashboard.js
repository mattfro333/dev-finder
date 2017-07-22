import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile';
import {Divider, Card, Table, Header, Image, Icon} from 'semantic-ui-react'
import axios from 'axios'
import './compDashboard.css';



class CompDashboard extends Component {
   constructor(){
     super()
     this.state={
       currentListings: [],
       newApplications: []
     }
     this.getListings = this.getListings.bind(this)
     this.getNewApplicants = this.getNewApplicants.bind(this)
   }
   getListings = () => {
     return axios.get(`/api/companyJobListings/${this.props.profile.profile[0].company_id}`)
   }
   getNewApplicants = () => {
     return axios.get(`/api/company/applications/${this.props.profile.profile[0].company_id}`)
   }
   changePhoto = ()=>{
     let self = this
     return axios.put('/api/updatepic').then((r)=>{
       this.close()
       getprofile(this.props.params.userid).then(dev => {
         this.props.addProfileInfo(dev)
         this.setState({
           dev: dev

         })
         console.log(this.state.dev);
       })
     })
   }
  render(){
    return(
      <div className="companyDashboardPage background">
        <Divider />
        <div className="companyDashboardContainer" >
          <div className="companyDashboardListingsContainer">
            <h2>Current Listings</h2>
            <Divider />
            <div className="companyDashboardListings" >
              <Card.Group itemsPerRow={3}>
              {this.state.currentListings.map((l,i)=>{
                return(
                  <Card key={i} raised >
                    <div className='currentCard'>
                       <Card.Header className='hoverTeal'onClick={()=>browserHistory.push(`/jobdetails/${l.id}`)}>{l.job_title}</Card.Header>
                    <Card.Meta>{l.location}</Card.Meta>
                    <Card.Description className="companyDashboardListingCardDescription">{l.description}</Card.Description>
                    <Card.Meta>Applicants: {l.count}</Card.Meta>
                    </div>

                  </Card>
                )
              })}
              </Card.Group>
            </div>
            <a className="companyDashboardBottomPageLink">See All Listings</a>
          </div>
          <div className="companyDashboardNewApplicantsContainer">
            <h2>New Applicants</h2>
            <Divider />
            <Table celled striped >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Icon name='user circle' />
                    Profile
                  </Table.HeaderCell>
                  <Table.HeaderCell>Job</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.newApplications.map((a, i)=>{
                  return(
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Header as='h4' onClick={()=>{browserHistory.push(`/profile/dev/${a.user_id}`)}} image>
                          <Image src={a.profilepic} shape='rounded' size='mini' />
                          <Header.Content className='hoverOrange'>
                            {a.firstname + ' ' + a.lastname}
                            <Header.Subheader>{a.city + ', ' + a.state}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  className='hoverOrange' onClick={()=>browserHistory.push(`/jobdetails/${a.id}`)}>
                            {a.job_title}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            <a  onClick={()=>browserHistory.push(`/applicants`)} className="companyDashboardBottomPageLink">See All Applicants</a>
          </div>
        </div>
      </div>

    )
  }
  componentWillMount(){
    this.getListings().then((r)=>this.setState({currentListings:r.data}))
    this.getNewApplicants().then((r)=>this.setState({newApplications:r.data}))
  }
}


export default CompDashboard
