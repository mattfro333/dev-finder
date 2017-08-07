import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Header, Image} from 'semantic-ui-react'
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
      <div className='watchlistPage background'>
    <div className='watchlistContainer' >
      <h1 className='centerHeader'>Your Pinned Jobs</h1>
    <div className='watchedJobs'>
      {this.state.watchlist.map((j,i)=>{
        console.log(j)
          return(
              <div
              onClick={()=> browserHistory.push(`/jobdetails/${j.id}`)}
                className='white watchlistBox card wwww'>
                    <Header as='h2'>
                      <Header.Content>
                        {j.job_title}
                        <Header.Subheader>
                          {j.city +', '+j.state}
                        </Header.Subheader>
                      </Header.Content>

                    </Header>
                    <Header as='h4' textAlign='left'>
                      <Image src={j.picture} size='mini' shape='circular'/>
                      <Header.Content>
                        {j.name}
                        <Header.Subheader>
                          {j.company_city +', '+j.company_state}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>

              </div>
          )
      })}
      <div  onClick={()=> browserHistory.push('/search')}className='white watchlistBox card'><h1>Find more Jobs</h1></div>
      </div>
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
