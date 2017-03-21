import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import './applicants.css';
import axios from 'axios';

class Applicants extends Component{
    constructor(){
        super()
        this.state = {
            applicants:[{}]
        }
this.getApplicants = this.getApplicants.bind(this)
    }
    getApplicants=()=>{
        return axios.get('/api/applicants')
    }
 render(){
    return(
        <div className = 'applicants-page'>
           <h1>Your applicants:</h1>

           {this.state.applicants.map((a,i)=>{
             return(
               <div clasName = 'white card'>{a.firstname}{a.lastname}</div>
             )}
           )};
        </div>
    )
 };
 componentDidMount(){
     this.getApplicants().then(r=>console.log(r))
 }
}
export default Applicants   