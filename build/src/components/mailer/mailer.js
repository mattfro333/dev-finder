import React from "react";
import { browserHistory } from "react-router";
import {Menu} from 'semantic-ui-react';
import axios from 'axios';
var Axios = axios.create({
  baseURL: 'http://localhost:3500',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
export default class Draft extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      from: "mattfro333@gmail.com",
      to: "",
      subject: "",
      text: ""
    };
  }
  handleChange( field, event ) {
    this.setState( { [ field ]: event.target.value } );
  }
	sendMessage( event ) {
		event.preventDefault();
Axios.post('/api/email', this.state).then(function(){
  console.log("Success!")
});
		// browserHistory.push( "/inbox" );
	}
	render() {
		const styles = this.getStyles();

		return (
			<div>
				<h1>New Message</h1>
				<form style={ styles.form }>
					<input
						placeholder="From: person@email.com"
						style={ styles.input }
						type="text"
            value={ this.state.from }
            onChange={ this.handleChange.bind( this, "from")}
					/>



					<input
						placeholder="To: person@email.com"
						style={ styles.input }
						type="text"
            value={ this.state.to }
            onChange={ this.handleChange.bind( this, "to")}
					/>

					<input
						placeholder="Subject"
						style={ styles.input }
						type="text"
            value={ this.state.subject }
            onChange={ this.handleChange.bind( this, "subject")}
					/>

					<textarea
						cols="50"
						rows="17"
						style={ styles.draft }
            value={ this.state.text }
            onChange={ this.handleChange.bind( this, "text")}
					/>

					<button
					onClick={ this.sendMessage.bind(this) }
					 style={ styles.sendButton }>
						Send
					</button>
				</form>

			</div>
		);
	}

	getStyles() {
		return {
			draft: {
				resize: "none"
				, width: "100%"
			}
			, form: {
				margin: "0 auto"
				, width: "90%"
			}
			, input: {
				border: "1px solid #e0e0e0"
				, borderRadius: 3
				, height: 28
				, marginBottom: 5
				, width: "100%"
			}
			, sendButton: {
				backgroundColor: "#00d8ff"
				, border: "1px solid #e0e0e0"
				, color: "white"
				, fontWeight: "bold"
				, height: 40
				, width: 100
			}
		}
	}
}
