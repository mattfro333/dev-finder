import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button} from 'semantic-ui-react'
import './companySignup.css';


class CompanySignUp extends Component{
  render(){
    return(
      <div>
      <h1>CompanySignUp</h1>
      <Input placeholder="Company Name" onChange={(e)=>this.compName = e.target.value}/>
      <Input placeholder="Description" onChange={(e)=>this.compDescription = e.target.value}/>
      <Input placeholder="City" />
      <Input placeholder="State" />
      <Input placeholder="Industry" />
      <Button content="Submit" />
     </div>
  )
  }
}

export default CompanySignUp
