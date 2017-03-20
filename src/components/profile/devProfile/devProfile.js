import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile';
import {Menu, Input, Button, Popup, Header, Image, Modal} from 'semantic-ui-react';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';
import config from './../../../../server/config'
import './devProfile.css';
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


class DevProfile extends Component{

  constructor(){
    super();

    this.state = {
      dev: [[{}],[{}],[{}],[{}]],
      open: false
    }
    this.show = (dimmer) => () => this.setState({ dimmer, open: true })
    this.close = () => this.setState({ open: false })

    this.EditUser = this.EditUser.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  EditUser = ()=>{
    return axios.put('/api/updatedev', {firstname: this.devFirstName, lastname: this.devLastName, email: this.devEmail, city: this.devCity, state: this.devState, desc: this.devDesc, type: this.devType, github: this.devGithub, codewars: this.devTwitter})
  }

  componentWillMount(){
    this.getUserId().then((r) => this.setState({user: r.data}))
  }
  getUserId = ()=>{
    return axios.get('/api/me')
  }

  render(){

    const { open, dimmer } = this.state

    var workex=this.state.dev[2].map(function(job){
  return (

    <div>
      <h1>{job.title}</h1>
      {job.start_month}/{job.start_year}-{job.end_month}/{job.end_year}
    <h2>{job.description}</h2>
    </div>

  );
})
var education=this.state.dev[1].map(function(school){
  return (

    <div>
      <h1>{school.title}</h1>
      {school.start_month}/{school.start_year}-{school.end_month}/{school.end_year}
    <h2>{school.description}</h2>
    </div>

  );
})
var portfolio=this.state.dev[3].map(function(piece){
  return (

    <div>
      <h1><a href={'http://'+piece.link_url} target='blank'>{piece.title}</a></h1>
      <img className='portfolioPic'src={piece.img_url}/>
    <h2>{piece.desc}</h2>
    </div>

  );
  })
    return(
      <div className='devProfile'>
        <div  className='topContainer'>

          <div className='devInfo white'>
            <div className='profilePic'>
            <img onClick={this.show('blurring')} className='devPic' src={this.state.dev[0][0].profilepic}/>
          </div>
            <h1>{this.state.dev[0][0].firstname + ' ' + this.state.dev[0][0].lastname}</h1>
            <Input placeholder='First Name' onChange={(e)=>this.devFirstName = e.target.value} />
            <Input placeholder='Last Name' onChange={(e)=>this.devLastName = e.target.value}/>
              <h3>Im from {this.state.dev[0][0].city}, {this.state.dev[0][0].state}.</h3>
              <Input placeholder='City' onChange={(e)=>this.devCity = e.target.value} />
                <Input placeholder='State' onChange={(e)=>this.devState = e.target.value} />
            <h4>{this.state.dev[0][0].description}</h4>
            <Input placeholder='Desc' onChange={(e)=>this.devDesc = e.target.value} />
          <div className=''><a><button>Message</button></a></div>
           <div className=''><a>{this.state.dev[0][0].email || 'Loading'}</a></div>
           <Input placeholder='Email' onChange={(e)=>this.devEmail = e.target.value} />
          <div className=''><a href={this.state.dev[0][0].github}>Github</a></div>
          <Input placeholder='Github' onChange={(e)=>this.devGithub = e.target.value} />
          <div className=''><a href={this.state.dev[0][0].twitter}>Twitter</a></div>
          <Input placeholder='Twitter' onChange={(e)=>this.devTwitter = e.target.value} />
          <Button className='signupButton' content='Update' onClick={()=>this.EditUser()}/>
          <div className='technologies'>
            <ul>
            </ul>
          </div>
        </div>
        <div className='rightResume white'>
          <div className='portfolioSection'>
            <h1 className='center'>Portfolio</h1>
            <div className='portfolioPieces'>
            <div>{portfolio || 'This user does not have a portfolio yet.'}</div>
            </div>
            <Button className='add' icon="plus"/>
            <Input placeholder='Title' onChange={(e)=>this.portTitle = e.target.value} />
            <Input placeholder='Description' onChange={(e)=>this.portTitle = e.target.value} />
            <Input placeholder='Image Url' onChange={(e)=>this.portImg = e.target.value} />
            <Input placeholder='Link' onChange={(e)=>this.portLink = e.target.value} />
            <Button className='signupButton' content='Add Portfolio'/>
          </div>
          <hr/>
          <h1 className='center'>Education</h1>
          <div className='educationSection'>
            {education}
          </div>
          <Button className='add' icon="plus"/>
          <Input placeholder='School' onChange={(e)=>this.eduCompany = e.target.value} />
          <Input placeholder='Description' onChange={(e)=>this.eduDesc = e.target.value} />
          <Input placeholder='Start Month' onChange={(e)=>this.eduSMonth = e.target.value} />
          <Input placeholder='Start Year' onChange={(e)=>this.eduSYear = e.target.value} />
          <Input placeholder='End Month' onChange={(e)=>this.eduEMonth = e.target.value} />
          <Input placeholder='End Year' onChange={(e)=>this.eduEYear = e.target.value} />
          <Button className='signupButton' content='Add Education'/>
          <hr/>
           <h1 className='center'>Work Experience</h1>
          <div className='workSection'>
            {workex}
          </div>
          <Button className='add' icon="plus"/>
          <Input placeholder='Company' onChange={(e)=>this.jobCompany = e.target.value} />
          <Input placeholder='Job Title' onChange={(e)=>this.jobTitle = e.target.value} />
          <Input placeholder='Description' onChange={(e)=>this.jobDesc = e.target.value} />
          <Input placeholder='Start Month' onChange={(e)=>this.jobSMonth = e.target.value} />
          <Input placeholder='Start Year' onChange={(e)=>this.jobSYear = e.target.value} />
          <Input placeholder='End Month' onChange={(e)=>this.jobEMonth = e.target.value} />
          <Input placeholder='End Year' onChange={(e)=>this.jobEYear = e.target.value} />
          <Button className='signupButton' content='Add Job Experience' />
          <hr/>
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
            <Button positive icon='checkmark' labelPosition='right' content="Use This Photo" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    getprofile(this.props.params.userid).then(dev => {
      this.setState({
        dev: dev

      })
      console.log(this.state.dev);
    })
  }
}

export default DevProfile
