import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react';
import Mailer from "../mailer/mailer.js";
import SweetAlert from "../SweetAlert/SweetAlert.js"
import './messages.css';


class Messages extends Component{
  render(){
    return(
      <div>
      <h1>Messages</h1>
      <Mailer />
     <SweetAlert />
      </div>
    )
  }
}

export default Messages
