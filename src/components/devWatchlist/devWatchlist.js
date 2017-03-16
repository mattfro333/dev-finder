import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Menu} from 'semantic-ui-react'
import './devWatchlist.css';
import axios from 'axios';

class DevWatchlist extends Component {
constructor(){
    super();

    this.state = {
        watchlist:[{}]
    }
    this.getWatchList = this.getWatchList.bind(this);
  } 
  getWatchList = ()=>{
    return axios.get('/api/flaggedJobs')
  }
  render(){ 
    return(
      <div>
      <h1>Dev Watchlist</h1>
      <hr/>
      {this.state.watchlist.map((j,i)=>{
          return(
              <div>
                  <h1>{j.job_title}</h1>
                  <h2>{j.name}</h2>
                 <p>{j.job_description}</p>
                 <p>{j.location}</p>
                 <hr/>
              </div>
          )
      })}
      </div>
    )
  }
  componentDidMount(){
      this.getWatchList().then((r) =>{
        this.setState({
          watchlist:r.data
        })
      console.log(r)
      })
  }  
}



export default DevWatchlist


