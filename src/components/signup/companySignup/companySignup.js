import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu, Input, Button} from 'semantic-ui-react'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'
import config from './../../../../server/config'
import axios from 'axios'
import './companySignup.css';
import 'react-fine-uploader/gallery/gallery.css'

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
      <h1>UpdateCompanyProfile</h1>
      <h2>Add Profile Image</h2>
      <Gallery uploader={uploader} />
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
