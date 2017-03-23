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
      <div className = 'watchlistPage background'>
      <h1>Your Pinned Jobs:</h1>
    <div className = 'watchedJobs'>
      {this.state.watchlist.map((j,i)=>{
          return(
              <div className ='white watchlistBox'>
                <div className =''>
                  <h1 onClick={()=> browserHistory.push(`/jobdetails/${j.id}`)}>
                    {j.job_title}
                    </h1>
                </div>
                  <div className=''>
                    <h2 onClick={()=> browserHistory.push(`/profile/company/${j.company_id}`)}>{j.name}
                    </h2>
                  </div>
                 <h3>{j.location}</h3>

              </div>
          )
      })}
      <div  onClick={()=> browserHistory.push('/search')}className = 'white watchlistBox'><h1>Find more Jobs</h1></div>
      </div>
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
