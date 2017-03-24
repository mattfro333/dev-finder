import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile';
import {Menu, Input, Button, Popup, Header, Image, Modal, Dropdown} from 'semantic-ui-react';
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

  constructor(props){
    super(props);

    this.state = {
      dev: [[{}],[{}],[{}],[{}]],
      open: false,
      mine: '',
      theirs: '',
      session_id: "",
      edit: "hide",
      companyUser: {},
      show: false
    }
    this.show = (dimmer) => () => this.setState({ dimmer, open: true })
    this.close = () => this.setState({ open: false })

    this.EditUser = this.EditUser.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.addPortfolio = this.addPortfolio.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.getUser = this.getUser.bind(this);
    this.whosProfile = this.whosProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.getCompanyName = this.getCompanyName.bind(this);
  }
  createRoom = ()=>{
    var self = this;
    return axios.post('/api/newRoom', {user1_id: this.state.dev[0][0].user_id, user2_id: this.state.companyUser.user_id, user1_name: this.state.dev[0][0].firstname + " " + this.state.dev[0][0].lastname, user2_name: this.state.companyUser.name}).then(response => {
        browserHistory.push('/messages')
    })
  }
  getCompanyName = ()=>{
    var self = this;
    return axios.post('/api/companyInfo').then(response => {
      self.setState({
        companyUser: response.data[0]
        })
      //console.log(this.state.companyUser.user_id,this.state.companyUser.name , this.state.dev[0][0].user_id, this.state.dev[0][0].firstname + " " + this.state.dev[0][0].lastname);
    })
  }
  whosProfile = ()=>{
    var self = this;
      console.log(this.state.dev[0][0].user_id, this.state.session_id);
      if (this.state.dev[0][0].user_id == this.state.session_id){
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
          edit: "",
          show: true
        })
  }
  finishEdit = ()=>{
    var self = this;
        self.setState({
          edit: "hide",
          show: false
        })
  }

//this.state is profile that we are viewing
  EditUser = ()=>{
    var self = this;
    return axios.put('/api/updatedev', {firstname: this.devFirstName, lastname: this.devLastName, email: this.devEmail, city: this.devCity, state: this.devState, desc: this.devDesc, type: this.devType, github: this.devGithub, codewars: this.devTwitter, skills: this.devSkills}).then(function(response) {
      getprofile(self.props.params.userid).then(dev => {
        self.setState({
          dev: dev

        })
      })
    })
}
getUser = ()=>{
  var self = this;
  console.log('running');
  return axios.get('/api/me').then(response => {
    console.log(response);
      self.setState({
        session_id: response.data.user_id
      })
  })
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
addPortfolio = ()=>{
  var self = this;
  return axios.post('/api/addPortfolio', {title: this.portTitle, description: this.portDesc, link: this.portLink, skills: this.portfolioSkills}).then(function(response) {
    getprofile(self.props.params.userid).then(dev => {
      self.setState({
        dev: dev

      })
  })
})
}
addEducation = ()=>{
  var self = this;
  return axios.post('/api/addEducation', {school: this.eduCompany, description: this.eduDesc, start_month: this.eduSMonth, start_year: this.eduSYear, end_month: this.eduEMonth, end_year: this.eduEYear}).then(function(response) {
    getprofile(self.props.params.userid).then(dev => {
      self.setState({
        dev: dev

      })
  })
})
}
addExperience = ()=>{
  var self = this;
  return axios.post('/api/addExperience', {company: this.jobCompany, title: this.jobTitle, description: this.jobDesc, start_month: this.jobSMonth, start_year: this.jobSYear, end_month: this.jobEMonth, end_year: this.jobEYear}).then(function(response) {
    getprofile(self.props.params.userid).then(dev => {
      self.setState({
        dev: dev

      })
  })
})
}
deletePortfolio = (id)=>{
  var self = this;
  return axios.post('/api/deletePortfolio', {id: id}).then(function(response) {
    getprofile(self.props.params.userid).then(dev => {
      self.setState({
        dev: dev

      })
  })
})
}
deleteExperience = (id)=>{
  var self = this;
  return axios.post('/api/deleteExperience', {id: id}).then(function(response) {
    getprofile(self.props.params.userid).then(dev => {
      self.setState({
        dev: dev

      })
  })
})
}

  componentWillMount(){
    this.getUserId().then((r) => this.setState({user: r.data}))
  }
  getUserId = ()=>{
    return axios.get('/api/me')
  }

  render(){
    var self = this;
    const { open, dimmer } = this.state
    console.log(this.state.dev[0][0].skills)
    var workex=this.state.dev[2].map(function(job, i){
        return (

          <div key={i}>
          <Button className={self.state.edit + ' DeleteButton'} content='X' onClick={()=>self.deleteExperience(job.experience_id)}/>
            <h1>{job.title}</h1>
            {job.start_month}/{job.start_year}-{job.end_month}/{job.end_year}
          <h2>{job.description}</h2>
          </div>

        );
        })
    var education=this.state.dev[1].map(function(school, i){
      return (

        <div key={i}>
        <Button className={self.state.edit + ' DeleteButton'} content='X' onClick={()=>self.deleteExperience(school.experience_id)}/>
          <h1>{school.title}</h1>
          {school.start_month}/{school.start_year}-{school.end_month}/{school.end_year}
        <h2>{school.description}</h2>
        </div>

      );
    })
  var portfolio=this.state.dev[3].map(function(piece, i){

    return (
      <div key={i}>
      <Button className={self.state.edit + ' DeleteButton'} content='X' onClick={()=>self.deletePortfolio(piece.id)}/>
        <h1><a href={'http://'+piece.link_url} target='blank'>{piece.title}</a></h1>
        <img className='portfolioPic'src={piece.img_url}/>
      <h2>{piece.desc}</h2>
      {piece.skills? <div className="ProfilePortfolioPieceSkillsContainer">{piece.skills.skills.map((s,i)=>{
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
            console.log('value',self.props.skills.skills[i].value)
          }
        }
        return(
          <Popup inverted size='tiny' style={style} trigger={<img className="ProfilePortfolioPieceSkillsImage" src={image} />}
          content={<p>{name}</p>}
        />
        )
      })}</div> :''}

      </div>

    );
    })

    return(
      <div className='devProfile background'>
        <div  className='topContainer'>
          <div className='devInfo white'>
            <div className='profilePic' onClick={this.show('blurring')}>
            <img  className='devPic' src={this.state.dev[0][0].profilepic}/>
          </div>
            <h1>{this.state.dev[0][0].firstname + ' ' + this.state.dev[0][0].lastname}</h1>
            <Button className={this.state.mine} onClick={()=>this.editProfile()}>Edit</Button>            
            <Button className={this.state.edit + ' signupButton'} content='Update' onClick={()=>{this.EditUser();this.finishEdit();}}/>
            <Input className={this.state.edit} placeholder='First Name' onChange={(e)=>this.devFirstName = e.target.value} />
            <Input className={this.state.edit} placeholder='Last Name' onChange={(e)=>this.devLastName = e.target.value}/>
              <h3>Im from {this.state.dev[0][0].city}, {this.state.dev[0][0].state}.</h3>
              <Input className={this.state.edit} placeholder='City' onChange={(e)=>this.devCity = e.target.value} />
                <Input className={this.state.edit} placeholder='State' onChange={(e)=>this.devState = e.target.value} />
            <h4>{this.state.dev[0][0].description}</h4>
            <Input className={this.state.edit} placeholder='Desc' onChange={(e)=>this.devDesc = e.target.value} />
          <div className=''><a><Button onClick={()=>this.createRoom()} className={this.state.theirs}>Message</Button></a></div>
           <div className=''><a>{this.state.dev[0][0].email || 'Loading'}</a></div>
           <Input className={this.state.edit} placeholder='Email' onChange={(e)=>this.devEmail = e.target.value} />
          <div className=''><a href={this.state.dev[0][0].github}>Github</a></div>
          <Input className={this.state.edit} placeholder='Github' onChange={(e)=>this.devGithub = e.target.value} />
          <div className=''><a href={this.state.dev[0][0].twitter}>Twitter</a></div>
          <Input className={this.state.edit} placeholder='Twitter' onChange={(e)=>this.devTwitter = e.target.value} />
          <Dropdown className={this.state.edit} placeholder='Skills' fluid multiple search selection options={this.props.skills.skills}  onChange={(e, d)=>{
            this.devSkills = {skills: d.value}
            console.log(this.devSkills);
          }}/>
        <div>
            {this.state.dev[0][0].skills? <div className="ProfileSkillsContainer">{this.state.dev[0][0].skills.skills.map((s,i)=>{
            let image
            let name
            for(let i = 0; i < this.props.skills.skills.length; i++){
              if(s === this.props.skills.skills[i].value){
                image = this.props.skills.skills[i].icon_url
                name = this.props.skills.skills[i].text
                console.log('value',this.props.skills.skills[i].value)
              }
            }
            const style = {
              borderRadius: 2,
              opacity: 0.8,
              height: 40
            }
            return(
            <Popup inverted style={style} trigger={<img className="ProfileSkillsImage" src={image} />}
              content={name}
            />
        )
          })}</div> :''}
        </div>
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
            <Button className={this.state.edit + ' add'}  icon="plus"/>
            <Input className={this.state.edit} placeholder='Title' onChange={(e)=>this.portTitle = e.target.value} />
            <Input className={this.state.edit} placeholder='Description' onChange={(e)=>this.portDesc = e.target.value} />
            {this.state.show ? <div><p>Add Image</p> <Gallery uploader={uploader}/></div> : null}
            <Input className={this.state.edit} placeholder='Link' onChange={(e)=>this.portLink = e.target.value} />
            <Dropdown className={this.state.edit} placeholder='Skills' fluid multiple search selection options={this.props.skills.skills}  onChange={(e, d)=>{
              this.portfolioSkills = {skills: d.value}
              console.log(this.portfolioSkills);
            }}/>
            <Button className={this.state.edit + ' signupButton'} content='Add Portfolio' onClick={()=>this.addPortfolio()}/>
          </div>
          <hr/>
          <h1 className='center'>Education</h1>
          <div className='educationSection'>
            {education}
          </div>
          <Button className={this.state.edit + ' add'} icon="plus"/>
          <Input className={this.state.edit} placeholder='School' onChange={(e)=>this.eduCompany = e.target.value} />
          <Input className={this.state.edit} placeholder='Description' onChange={(e)=>this.eduDesc = e.target.value} />
          <Input className={this.state.edit} placeholder='Start Month' onChange={(e)=>this.eduSMonth = e.target.value} />
          <Input className={this.state.edit} placeholder='Start Year' onChange={(e)=>this.eduSYear = e.target.value} />
          <Input className={this.state.edit} placeholder='End Month' onChange={(e)=>this.eduEMonth = e.target.value} />
          <Input className={this.state.edit} placeholder='End Year' onChange={(e)=>this.eduEYear = e.target.value} />
          <Button className={this.state.edit + ' signupButton'} content='Add Education' onClick={()=>this.addEducation()}/>
          <hr/>
           <h1 className='center'>Work Experience</h1>
          <div className='workSection'>
            {workex}
          </div>
          <Button className={this.state.edit + ' add'} icon="plus"/>
          <Input className={this.state.edit} placeholder='Company' onChange={(e)=>this.jobCompany = e.target.value} />
          <Input className={this.state.edit} placeholder='Job Title' onChange={(e)=>this.jobTitle = e.target.value} />
          <Input className={this.state.edit} placeholder='Description' onChange={(e)=>this.jobDesc = e.target.value} />
          <Input className={this.state.edit} placeholder='Start Month' onChange={(e)=>this.jobSMonth = e.target.value} />
          <Input className={this.state.edit} placeholder='Start Year' onChange={(e)=>this.jobSYear = e.target.value} />
          <Input className={this.state.edit} placeholder='End Month' onChange={(e)=>this.jobEMonth = e.target.value} />
          <Input className={this.state.edit} placeholder='End Year' onChange={(e)=>this.jobEYear = e.target.value} />
          <Button className={this.state.edit + ' signupButton'} content='Add Job Experience' onClick={()=>this.addExperience()}/>
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
            <Button positive icon='checkmark' labelPosition='right' content="Use This Photo" onClick={()=>this.changePhoto()} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    var self = this;
    getprofile(this.props.params.userid).then(dev => {
      // this.props.addProfileInfo(dev)
      this.setState({
        dev: dev

      })
      console.log(this.state.dev);
    }).then(function(response) {
      self.getUser().then(function(response) {
        self.whosProfile();
        self.getCompanyName();
      });
    });


  }
}

export default DevProfile
