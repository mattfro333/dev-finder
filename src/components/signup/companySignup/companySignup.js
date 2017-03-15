import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button} from 'semantic-ui-react'
import axios from 'axios'
import './companySignup.css';


class CompanySignUp extends Component{
  constructor(){
    super()
    this.state={
    }
    this.CreateCompany=this.CreateCompany.bind(this)
    this.getUserId = this.getUserId.bind(this);
  }
  CreateCompany=()=>{
    return axios.post('/api/createcomp', {
      name: this.compName,
      description: this.compDescription,
      city: this.compCity,
      state: this.compState,
      industry: this.compIndustry
    })
  }
  componentWillMount(){
    this.getUserId().then((r) => this.setState({user: r.data}))
  }
  getUserId = ()=>{
    return axios.get('/api/me')
  }
  render(){
    return(
      <div>
      <h1>UpdateProfile</h1>
      <Input placeholder="Company Name" onChange={(e)=>this.compName = e.target.value}/>
      <Input placeholder="Description" onChange={(e)=>this.compDescription = e.target.value}/>
      <Input placeholder="City" onChange={(e)=>this.compCity = e.target.value}/>
      <Input placeholder="State" onChange={(e)=>this.compState = e.target.value}/>
      <Input placeholder="Industry" onChange={(e)=>this.compIndustry = e.target.value}/>
      <Button content="Submit" onClick={()=>this.CreateCompany()}/>
      <Button content='Go To Dashboard' onClick={()=>browserHistory.push
        (`/profile/company/dashboard/${this.state.user.user_id}`)}/>
     </div>
  )
  }
}

export default CompanySignUp
