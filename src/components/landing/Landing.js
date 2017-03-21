import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Container, Header, Segment, Divider, Icon, Image} from 'semantic-ui-react'
import axios from 'axios'
import './Landing.css';




class Landing extends Component{



  render(){
<<<<<<< HEAD
    return(

      <div>
        <div className="landingbody">
          <Segment inverted>
              <Divider inverted />
              <Divider horizontal inverted id="landtitle">Dev-Finder</Divider>
          </Segment>
          <Header textAlign='center'>
            <Image src={Logo} size='large'/>
          </Header>
          <Container text>
            <p>Dev-Finder is designed to connect developers to companies. This site allows developers and companies to both create profiles. The idea is that developers can search through company profiles and communicate with them and vice versa.
            Our goal is to weed out all the flashy distractions that most social networking mediums have, and just leave a seemless line of communication aimed at matching developers with companies
            that accent their strengths. This will bolster the companies worth and output.</p>
            <p>Some of the highlights of Dev-Finder are a responsive watchlist, quick messaging, e-mailing capabilities, google analytics, and grouping of specific skill sets. We promise a simple solution
            to the issue of finding an employee, or an employer. So signup, login, and find
            the company, or developer that best fits you!</p>
          </Container>
          <Canvas />
          <div id='landsignbutton'>
            <Segment className='landingbuttoncontainer' padded>
              <Button id='landlogbutton' color="teal" content='Login' onClick={()=>browserHistory.push('/login')} />
              <Divider vertical>Or</Divider>
              <Button color="orange" content='Sign Up' onClick={()=>browserHistory.push('/signup')} />
            </Segment>
          </div>
          </div>
=======
    return(<div>
     <div className= 'land-nav'>
       <div className='logo'></div>
       <div className = 'landing-buttons'>
         <Button color='orange'onClick={()=> browserHistory.push('/login')}>Login</Button>
         <Button color='teal' onClick={()=> browserHistory.push('/signup')}>Sign-up</Button>
       </div>
     </div>
      <div className= 'landing-page'>
        <div className= 'black-shadow'>
          <div className = 'landing-text'>
                <h1>{'{'}<span className='blue'>employment</span>=<span className='orange'>true</span>}</h1>
        <h2>By Developers. For Developers.</h2>
        <h3>Sign up today to find your next employment opportunity.</h3>
          </div>
    

        </div>
>>>>>>> master
      </div>
      </div>
    )
  }
}

export default Landing;
