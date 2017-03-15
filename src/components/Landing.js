import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Container, Header, Segment, Divider, Icon, Image} from 'semantic-ui-react'
import axios from 'axios'



class Landing extends Component{


  render(){
    return(
      <div>
      <Segment inverted>
            <Divider inverted />
            <Divider horizontal inverted as="h1"  color="orange" >Dev-Finder</Divider>
          </Segment>
      <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
    </Header>
      <Container text>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong.
         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
         Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. </p>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong.
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequa</p>
      </Container>


  <Segment padded>
    <Button primary fluid content='Login' onClick={()=>browserHistory.push('/login')} />
    <Divider horizontal>Or</Divider>
    <Button secondary fluid content='Sign Up' onClick={()=>browserHistory.push('/signup')} />
  </Segment>

      </div>
    )
  }
}

export default Landing;
