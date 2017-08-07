import React from 'react';
import {} from "react-router";
import {} from "semantic-ui-react";
import SweetAlert from 'sweetalert-react';
import './../../../node_modules/sweetalert/dist/sweetalert.css';

export default class Alert extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }


render() {
  return (
    <div>
      <SweetAlert

        show={this.props.show}
        title={this.props.alertTitle}
        text={this.props.alertText}
        onConfirm={this.props.onConfirm}

      />
    </div>
  );
 }
}
