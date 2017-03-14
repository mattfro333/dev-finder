import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react'
import './site.scss';
import DevDashboard from '../dashboard/devDashboard/devDashboard'
import CompDashboard from '../dashboard/compDashboard/compDashboard'


class Dashboard extends Component {
  render(){
    let dashboard = DevDashboard

    return (

      <h1>Dashboard</h1>


    )
  }
}

export default Dashboard
