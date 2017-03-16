import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react'
import './compProfile.css';
import { getCompanyProfile } from '../../../services/companyProfile.js'

class CompProfile extends Component{
  constructor(){
    super();

    this.state = {
      company: [{}]
    }

  }
  render(){
    return(
      <div className = 'body'>
        <div className='main-info'>
          <div className = 'left-pane white'>
            <div className='prof-pic'>
          <img className='pic' src={this.state.company[0].picture}/>
          </div>
          <div className='info'>
            <h1>{this.state.company[0].name}</h1>
            <h2>Reviews</h2>
            <h3>Founded: {this.state.company[0].founded}</h3>
            <h3><button>Message</button></h3>
          </div>
            
          </div>
          <div className = 'right-pane white'><h1>Company Bio: </h1>
         
          <p>{this.state.company[0].description}</p>
            <p>Vestibulum maximus lorem sapien, ac volutpat quam fringilla vitae. Aliquam consequat accumsan nisl, in consectetur purus vehicula non. Maecenas at vehicula risus, auctor sodales nunc. Nam fringilla orci metus, sit amet hendrerit enim tincidunt sed. Phasellus porttitor id augue at faucibus.</p>

           <p>Sed efficitur bibendum scelerisque. Proin varius, dolor ut viverra consectetur, lectus mauris lacinia lacus, at ultricies justo nisl ac sem. Nullam a ex luctus, molestie nisi id, interdum turpis.            Vivamus aliquam convallis sapien, non ultricies nisl aliquam sed. Quisque pretium eleifend sodales. Nulla cursus dui vehicula, aliquam est vitae, fringilla tellus. Aenean aliquet quam eget ligula pulvinar,            id tincidunt risus fermentum. In hac habitasse platea dictumst. Mauris mollis magna urna, vitae pretium eros fringilla et. Nullam sodales suscipit tellus, quis cursus justo volutpat vel. Quisque vel            congue nulla. Pellentesque vestibulum, ligula eget pulvinar euismod, ex lorem ultricies ipsum, vitae suscipit nunc mauris a arcu.</p>
           
          
           </div>
            <div className=' right-pane white'>
               <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
             <h2>Position Name</h2>
            <h3>Position Location</h3>
            <p>This is a short position Description </p>
            </div>
           
        </div>
      </div>

    )
  }
   componentDidMount() {
    getCompanyProfile(this.props.params.userid).then(company => {
      this.setState({
        company: company

      })
      console.log(company[0]);
    })
  }
}

export default CompProfile
