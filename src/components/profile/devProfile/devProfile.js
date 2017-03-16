import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { getprofile } from '../../../services/devProfile'
import {Menu} from 'semantic-ui-react'
import './devProfile.css';

class DevProfile extends Component{

  constructor(){
    super();

    this.state = {
      dev: [[{}],[{}],[{}],[{}]]
    }
  }

  render(){
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
            <img className='devPic' src={this.state.dev[0][0].profilepic}/>>
          </div>
            <h1>{this.state.dev[0][0].firstname + ' ' + this.state.dev[0][0].lastname}</h1>
              <h3>Im from {this.state.dev[0][0].city}, {this.state.dev[0][0].state}.</h3>
            <h4>{this.state.dev[0][0].description}</h4>
          <div className=''><a><button>Message</button></a></div>
           <div className=''><a>{this.state.dev[0][0].email || 'Loading'}</a></div>
          <div className=''><a href={this.state.dev[0][0].github}>Github</a></div>
          <div className=''><a href={this.state.dev[0][0].twitter}>Twitter</a></div>
          <div className='technologies'>
            <ul>
            </ul>
          </div>
        </div>
        <div className='rightResume white'>
          <div className='portfolioSection'>
            <h1 className='center'>Portfolio</h1>
            <div className='portfolioPieces'>  <div>{portfolio || 'This user does not have a portfolio yet.'}</div></div>

          </div>
          <hr/>
          <h1 className='center'>Education</h1>
          <div className='educationSection'>
            {education}
          </div>
          <hr/>
           <h1 className='center'>Work Experience</h1>
          <div className='workSection'>
            {workex}
          </div>
          <hr/>
        </div>
        </div>
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
