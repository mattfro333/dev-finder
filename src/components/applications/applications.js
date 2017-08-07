import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import './applications.css';
import axios from 'axios';

class Applications extends Component{
    constructor(){
        super()
        this.state = {
            applications:[{}]
        }
        this.getApplications = this.getApplications.bind(this);
    }
 getApplications = ()=>{
    return axios.get('/api/applications')
  }
 render(){
    return(
        <div className='applications-page background'>
           <h1>Your applications:</h1>
           {this.state.applications.map((a,i)=>{
               return(
                   <div  onClick={()=>browserHistory.push(`/jobdetails/${a.job_id}`)}className='white card'>

                  <h1>{a.job_title}</h1>
                  <h2>{a.name}</h2>
                  <h3>{a.location}</h3>
                   </div>
               )
           })}
        </div>
    )
 };
componentDidMount(){
    this.getApplications().then((r) =>{
        console.log(r);
        this.setState({
            applications:r.data
        })
    })
}

}
export default Applications
