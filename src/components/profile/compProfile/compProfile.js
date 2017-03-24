import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button, Popup, Header, Image, Modal, Dropdown, TextArea} from 'semantic-ui-react';
import { getprofile } from '../../../services/devProfile';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';
import './compProfile.css';
import config from './../../../../server/config'
import { getCompanyProfile } from '../../../services/companyProfile.js';
import axios from 'axios';

const uploader = new FineUploaderS3({
  options: {
    chunking: {
      enabled: false
    },
    request: {
      endpoint: 'https://devfinder.s3.amazonaws.com',
      accessKey: config.accessKey
    },
    cors: {
       //all requests are expected to be cross-domain requests
       expected: true,
   },
    retry: {
      enableAuto: true
    },
    signature:{
      endpoint: '/s3handler'
    },
    uploadSuccess:{
      endpoint: '/s3handler?success=true'
    }
  }
})


class CompProfile extends Component{
  constructor(props){
    super(props);

    this.state = {
      company: [{}],
      open: false,
      id: 0,
      userName: "",
      jobs: [{}],
      jobList: [],
      edit: "hide",
      mine: "",
      theirs: "",
      session_id: ""
    }
    this.show = (dimmer) => () => this.setState({ dimmer, open: true })
    this.close = () => this.setState({ open: false })
    this.createRoom = this.createRoom.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.getUserId=this.getUserId.bind(this)
    this.getJobs = this.getJobs.bind(this)
    this.getCompanyJobs = this.getCompanyJobs.bind(this)
    this.editCompany = this.editCompany.bind(this)
    this.editProfile = this.editProfile.bind(this)
    this.finishEdit = this.finishEdit.bind(this)
    this.whosProfile = this.whosProfile.bind(this)
    this.getUser = this.getUser.bind(this)
    this.changePhoto = this.changePhoto.bind(this)
  }
  changePhoto = ()=>{
    let self = this
    return axios.put('/api/updatecomppic').then((r)=>{
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
  getCompanyJobs = ()=>{
    var self = this;
    return axios.post('/api/companyJobs', {id: this.state.company[0].company_id}).then(response => {
      self.setState({
        jobList: response.data
      })
    })
  }
  getUser = ()=>{
    var self = this;
    return axios.get('/api/me').then(response => {
        self.setState({
          session_id: response.data.user_id
        })
    })
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

      self.setState({
        userName: response.data[0].firstname + " " + response.data[0].lastname
      })
    })
  }
  editCompany = ()=>{
    var self = this;
    return axios.put('/api/updatecompanyprofile', {id: this.state.company[0].company_id, name: this.devCompanyName, city: this.devCompanyCity, state: this.devCompanyState, founded: this.devCompanyFounded, bio: this.devCompanyBio}).then(function(response) {
      getCompanyProfile(self.props.params.userid).then(company => {
        self.setState({
          company: company

        })
      }).then(function(response) {
        self.finishEdit();
      });
    })
}
whosProfile = ()=>{
  var self = this;

    if (this.state.company[0].user_id == this.state.session_id){
      self.setState({
        mine: "",
        theirs: "hide"
      })
    } else {
      self.setState({
        mine: "hide",
        theirs: ""
      })
    }
}
editProfile = ()=>{
  var self = this;
      self.setState({
        edit: ""
      })
}
finishEdit = ()=>{
  var self = this;
      self.setState({
        edit: "hide"
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
    const { open, dimmer } = this.state
    var self = this;
    var jobs=this.state.jobList.map(function(jobs, i){
      return (
        <div key={i}>
        <p>{jobs.job_title}</p>
        <p>{jobs.location}</p>
        {jobs.skills? <div className="ProfilePortfolioPieceSkillsContainer">{jobs.skills.skills.map((s,i)=>{
          let image
          let name
          const style = {
            borderRadius: 2,
            opacity: 0.8,
            height: 40
          }
          for(let i = 0; i < self.props.skills.skills.length; i++){
            if(s === self.props.skills.skills[i].value){
              image = self.props.skills.skills[i].icon_url
              name = self.props.skills.skills[i].text
            }
          }
          return(
            <Popup inverted size='tiny' style={style} trigger={<img className="ProfilePortfolioPieceSkillsImage" src={image} />}
            content={<p>{name}</p>}
          />
          )
        })}</div> :''}
        <p>{jobs.job_description}</p>
        <hr/>
        </div>

      );
    })
    var self = this;
    return(
      <div className = 'body background'>
        <div className='main-info'>
          <div className = 'left-pane white overflow-scroll'>
            <div className='prof-pic'>
          <img className='pic' src={this.state.company[0].picture}/>
          </div>
          <div className='info'>
            <h1>{this.state.company[0].name}</h1>
            <Input className={this.state.edit} placeholder='Company name' onChange={(e)=>this.devCompanyName = e.target.value} />
            <h3>Location: {this.state.company[0].city} {this.state.company[0].state}</h3>
            <Input className={this.state.edit} placeholder='City' onChange={(e)=>this.devCompanyCity = e.target.value} />
            <Input className={this.state.edit} placeholder='State' onChange={(e)=>this.devCompanyState = e.target.value} />
            <h3>Founded: {this.state.company[0].founded}</h3>
            <Input className={this.state.edit} placeholder='Company Founded' onChange={(e)=>this.devCompanyFounded = e.target.value} />
            <h3><Button className={this.state.theirs} onClick={()=>self.createRoom()}>
              Message
              </Button></h3>
              <Button className={this.state.edit} onClick={()=>self.editCompany()}>
                Save Changes
                </Button>
                <Button className={this.state.mine} onClick={()=>this.editProfile()}>Edit</Button>
          </div>

          </div>
          <div className = 'right-pane white'><h1>Company Bio: </h1>
          <TextArea className={this.state.edit + ' editBio' } placeholder='Company Bio' onChange={(e)=>this.devCompanyBio = e.target.value} />
          <p>{this.state.company[0].description}</p>
           </div>
            <div className=' right-pane white'>
               <h2>Position Name</h2>
               {jobs}
            </div>

        </div>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Gallery uploader={uploader} className='modalPic'/>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Use This Photo" onClick={()=>this.changePhoto()} />
          </Modal.Actions>
        </Modal>
      </div>

    )
  }
   componentDidMount() {

     var self = this
    getCompanyProfile(this.props.params.userid).then(company => {
      this.setState({
        company: company

      })
    }).then(function(response) {
      self.getUser().then(function(response) {
        self.getCompanyJobs();
        self.whosProfile();
      });
    });
    this.getUserName();
    this.getUserId();
  }
}

export default CompProfile
