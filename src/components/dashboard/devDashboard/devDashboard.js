import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react'
import './devDashboard.scss';
import Mailer from "./../../mailer/mailer.js"


class DevDashboard extends Component {

  render(){
    return(
      <div>
      <h1>Dev Dashboard</h1>
      <Mailer />
      </div>
    )
  }
}


export default DevDashboard
