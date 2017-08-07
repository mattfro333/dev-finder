import React, {Component} from 'react';
import {} from 'react-router';
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
        <div className='applicants-page background'>
           <h1>Your applicants:</h1>

           {this.state.applicants.map((a,i)=>{
             return(
               <div className='white card'>{a.firstname} {a.lastname}
               </div>
             )}
           )};
        </div>
    )
 };
 componentDidMount(){
     this.getApplicants().then((r)=>{
         console.log(r);
        this.setState({
            applicants:r.data
        })
    })
 }
}
export default Applicants
