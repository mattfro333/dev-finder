import React from 'react';
import { browserHistory } from "react-router";
import {Menu} from "semantic-ui-react";
import SweetAlert from 'sweetalert-react';
import './../../../node_modules/sweetalert/dist/sweetalert.css';

export default class Draft extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }


render() {
  return (
    <div>
      <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        show={this.state.show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false})}
      />
    </div>
  );
 }
}
