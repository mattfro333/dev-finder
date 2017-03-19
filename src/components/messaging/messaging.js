import React, {Component} from 'react';
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
      user: {}
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

  getthread = (id)=>{
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
    return axios.post(`/api/sendmessage`, {message: this.state.message, room_id: this.state.threads[0].room_id, createdtime: currentDate}).then(
      function(){
        self.setState({message: ''});
      self.getthread(self.state.threads[0].room_id);
    })
  }
  update = ()=>{
    this.getthread(this.state.threads[0].room_id);
  }


  render(){
    return(
      <div>
        <h1>Messaging Section</h1>
          <div className='roomslist'>
            <h1>Threads</h1>
              {this.state.rooms.map((r, i) => {
                let roomName = '';
                if (r.user1_id == this.state.user.user_id){
                  roomName = r.user2_name
                }else {
                  roomName = r.user1_name
                }
                return (
                  <div className='rooms '>
                  <Button onClick={()=>this.getthread(r.room_id)}> {roomName} </Button>
                  <hr/>
                  </div>
                      )
                    })}
          </div>
        <div className='thread'>
        <h1>Room</h1>
        {this.state.threads.map((t, i) => {
          let messageSide = '';
          if (t.sender_id == this.state.user.user_id){
            messageSide = 'right';
          }else {
            messageSide = 'left';
          }
          return (
            <div className='rooms'>
            <p className= {messageSide} > {t.message} </p>
            </div>
                )
              })}
      <Input placeholder='Message' value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
      <Button content='Send' onClick={()=>this.sendmessage()}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
      this.getRooms().then(rooms => {
        this.setState({rooms: rooms.data})
        this.getUser()
      })
      setInterval(this.update, 5000);
    }
}

export default Messaging
