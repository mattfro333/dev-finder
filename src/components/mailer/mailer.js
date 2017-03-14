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

// import React from "react";
// import ReactDOM from "react-dom";
// import marked from "marked";
// import $ from "jquery";
// var Comment = React.createClass({
//   rawMarkup: function() {
//     var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
//     return { __html: rawMarkup };
//   },
//
//   render: function() {
//     return (
//       <div className="comment">
//         <h2 className="commentAuthor">
//           {this.props.author}
//         </h2>
//         <span dangerouslySetInnerHTML={this.rawMarkup()} />
//       </div>
//     );
//   }
// });
//
// var CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   handleCommentSubmit: function(comment) {
//     var comments = this.state.data;
//
//     comment.id = Date.now();
//     var newComments = comments.concat([comment]);
//     this.setState({data: newComments});
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: comment,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         this.setState({data: comments});
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//         <h1>Emails Sent:</h1>
//         <CommentList data={this.state.data} />
//         <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//       </div>
//     );
//   }
// });
//
// var CommentList = React.createClass({
//   render: function() {
//     var commentNodes = this.props.data.map(function(comment) {
//       return (
//         <Comment author={comment.author} key={comment.id}>
//           {comment.text}
//         </Comment>
//       );
//     });
//     return (
//       <div className="commentList">
//         {commentNodes}
//       </div>
//     );
//   }
// });
//
// var CommentForm = React.createClass({
//   getInitialState: function() {
//     return {author: '', text: ''};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var author = this.state.author.trim();
//     var text = this.state.text.trim();
//     if (!text || !author) {
//       return;
//     }
//     this.props.onCommentSubmit({author: author, text: text});
//     this.setState({author: '', text: ''});
//   },
//   render: function() {
//     return (
//       <form className="commentForm" onSubmit={this.handleSubmit}>
//         <input
//           type="text"
//           placeholder="Your name"
//           value={this.state.author}
//           onChange={this.handleAuthorChange}
//         />
//         <input
//           type="text"
//           placeholder="Say something..."
//           value={this.state.text}
//           onChange={this.handleTextChange}
//         />
//         <input type="submit" value="Send Email" />
//       </form>
//     );
//   }
// });
//
// ReactDOM.render(
//   <CommentBox url="/api/comments" pollInterval={2000} />,
//   document.getElementById('content')
// );
