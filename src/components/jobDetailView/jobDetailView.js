import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Button, Icon, Image, Popup} from 'semantic-ui-react';
import { getjob } from './../../services/jobinfo'
import './jobDetailView.css';
import axios from 'axios';

class jobDetails extends Component{

  constructor(){
    super();


    this.state = {
      job: [{}],
      id: "",
      userName: ""

    }
    this.applyJob=this.applyJob.bind(this)
    this.watchJob=this.watchJob.bind(this)
    this.getUserId=this.getUserId.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.createRoom = this.createRoom.bind(this)
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
      console.log(response.data.user_id, this.state.job, this.state.job.name);
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
  createRoom = ()=>{
    var self = this;
    return axios.post('/api/newRoom', {user1_id: this.state.id, user2_id: this.state.job.id, user1_name: this.state.userName, user2_name: this.state.job.name}).then(response => {
        browserHistory.push('/messages')
    })
  }


  render(){
    var self = this;
    return (
      <div className ='background'>
          <div className=' jobBox topJobContainer white'>
            <div>
              <img className = 'jobPic'src={this.state.job.picture}/>
              <div className = 'basicJobInfo'>
                  <h1 className='companyName'>{this.state.job.name}</h1>
              <h2 className='jobtitle'>{this.state.job.job_title}</h2>
        <h3>
          <Icon name='location arrow' color='black'></Icon>{this.state.job.city}, {this.state.job.state}</h3>
           <Button
           color='teal'
           onClick={()=>this.applyJob(this.state.job.id)}>
           Apply
           </Button>
           <Button
           color='orange'
             onClick={()=>this.watchJob(this.state.job.id)}>
             Save
             </Button>
             <Button 
             primary
             onClick={()=>self.createRoom()}>
               Message
               </Button>
           <br/>
           <h4> This job was listed on {this.state.job.timestamped}</h4>
           {this.state.job.skills? <div>{this.state.job.skills.skills.map((s,i)=>{
             let image
             let name
             const style = {
               borderRadius: 2,
               opacity: 0.8,
               height: 40
             }
             for(let i = 0; i < this.props.skills.skills.length; i++){
               if(s === this.props.skills.skills[i].value){
                 image = this.props.skills.skills[i].icon_url
                 name = this.props.skills.skills[i].text
                 console.log('value',this.props.skills.skills[i].value)
               }
             }
             return(
               <Popup inverted style={style} trigger={<img className="ProfilePortfolioPieceSkillsImage" src={image} />}
               content={name}
             />
             )
           })}</div> :''}
              </div>


            </div>
          </div>

      <div className = 'jobBox white'>
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
    this.getUserName();
    this.getUserId();
    }
}

export default jobDetails
