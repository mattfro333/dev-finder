import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {Input, Button} from 'semantic-ui-react'
import './messaging.css';
import axios from 'axios';


class Messaging extends Component{

  constructor(){
    super();
    this.state = {
      message: '',
      name: {},
      rooms: [],
      threads: [],
      user: {},
      currentRoom: 0
    }
    this.getRooms = this.getRooms.bind(this);
    this.getthread = this.getthread.bind(this);
    this.sendmessage = this.sendmessage.bind(this);
    this.update = this.update.bind(this);

  }
  getRooms = ()=>{
    var self = this;
    return axios.get(`/api/rooms`)
  }

  getthread = (id, currentRoom)=>{
    this.currentChat = currentRoom
    return axios.put(`/api/threads`, {id: id}).then(threads => {
      this.setState({threads: threads.data})
      console.log('hello its me');
    })

  }

  getUser = ()=>{
    return axios.get(`/api/me`).then(user => {this.setState({user: user.data})
    })
  }

  sendmessage = ()=>{
    var currentDate = new Date()
    var self = this;
    console.log(this.state.currentRoom);
    this.scrollBottom();
    return axios.post(`/api/sendmessage`, {message: this.state.message, room_id: this.state.currentRoom, createdtime: currentDate}).then(
      function(){
        self.setState({message: ''});
      self.getthread(self.state.currentRoom, self.currentChat);
    })

  }
  update = ()=>{
    this.getthread(this.state.currentRoom, this.currentChat);
  }

  scrollBottom = ()=>{
    const node =ReactDOM.findDOMNode(this.refs.dms);
    node.scrollTop=node.scrollHeight;
  }
  render(){
    return(
      <div className = 'messaging background'>
        <h1>Your Inbox</h1>
          <div className='roomslist white'>
            <h1>Contacts</h1>
            <hr/>
              {this.state.rooms.map((r, i) => {
                let roomName = '';
                if (r.user1_id == this.state.user.user_id){
                  roomName = r.user2_name
                }else {
                  roomName = r.user1_name
                }
                return (
                  <div className='rooms'>
                  <Button fluid onClick={()=>{
                    this.setState({
                      currentRoom: r.room_id
                    })
                    this.getthread(r.room_id, roomName).then(()=>this.scrollBottom())}}>{roomName} </Button>
                  </div>
                      )
                    })}
          </div>
        <div className='thread white'>
        <h1>{this.currentChat}</h1>
        <div className = 'dms' ref='dms'>
        {this.state.threads.map((t, i) => {
          let messageSide = '';
          if (t.sender_id == this.state.user.user_id){
            messageSide = 'right-message';
          }else {
            messageSide = 'left-message';
          }
          return (

            <div className= 'message'>
               <div className= {messageSide}>
            <p > {t.message} </p>

            </div>
            <br/>
            </div>
                )
              })}
              <div ref={(el) => { this.messagesEnd = el}}>
              </div>
              </div>
      <Input  className= 'messageInput' placeholder='Message' value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
      <Button  className= 'sendBtn'content='Send' onClick={()=>this.sendmessage()}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
      this.getRooms().then(rooms => {
        this.setState({rooms: rooms.data})
        this.getUser()
      })
      setInterval(this.update, 2500);
    }
}

export default Messaging
