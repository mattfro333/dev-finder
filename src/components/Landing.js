import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Container, Header, Segment, Divider, Icon, Image} from 'semantic-ui-react'
import Logo from './../DevFinder.png'
import axios from 'axios'
import './Landing.css';


class Landing extends Component{


  render(){
    return(
      <div>


        <Segment inverted>
              <Divider inverted />
              <Divider horizontal inverted as="h1">Dev-Finder</Divider>
        </Segment>

        <Header textAlign='center'>
        </Header>

        <Container text>
          <p>Dev-Finder is a comprehensive approach designed to connect developers to the companies that fit their skills best, ultimately maximizing efficiency and productivity. This site allows
          developers and companies to create unique profiles. The idea is that developers can search through company profiles and communicate with them while companies can simultaneously to the same.
          Our goal is to weed out all the flashy distractions that most social networking mediums have and just leave a seemless line of communication aimed at matching developers with companies
          that accent their strengths. This will bolster the companies worth and output.</p>
          <p>Some of the higlights of our site Dev-Finder are a responsive watchlist, quick messaging, e-mailing capabilities, google analytics, and grouping of specific skill sets. We promise a simple solution
          to the issue of find an employee or an employer. So signup, login, and find
          the company or developer that best fits you!</p>
        </Container>

        <div id='landsignbutton'>
          <Segment className='landingbuttoncontainer' padded>
            <Button id='landlogbutton' color="teal" content='Login' onClick={()=>browserHistory.push('/login')} />
            <Divider vertical>Or</Divider>
            <Button color="orange" content='Sign Up' onClick={()=>browserHistory.push('/signup')} />
          </Segment>
        </div>

      </div>
    )
  }
}

export default Landing;
