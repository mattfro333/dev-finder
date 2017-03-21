import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Input, Button, Header, Segment, Divider, Image} from 'semantic-ui-react';
import Logo from './../../DevFinder.png'
import axios from 'axios';
import './login.css';

class Login extends Component {
    constructor() {
        super()
        this.state = {}
        this.login = this.login.bind(this)
        this.getSkills = this.getSkills.bind(this)
    }
    getSkills = ()=>{
      return axios.get('/api/skills').then((r)=>{
         let skills = r.data
         this.props.addSkills(skills)
      })
    }
    login = () => {
        return axios.post('/api/login', {
            username: this.usernameInput,
            password: this.passwordInput
        }).then((r) => {
            console.log(r.data);
            let user = r.data
            let profile = {}
            this.props.addUserInfo(user)
            if (user.company) {
                axios.get(`/api/companyProfile/${user.user_id}`).then((r) => {
                    profile = r.data
                    console.log(profile);
                    this.props.addProfileInfo(profile)
                    if (!profile[0]) {
                        browserHistory.push(`/profile/company/edit/${user.user_id}`)
                    } else {
                        browserHistory.push(`/profile/company/dashboard/${user.user_id}`)
                    }

                })} else {
                axios.get(`/api/devProfile/${user.user_id}`).then((r) => {
                    console.log(r)
                    profile = r.data
                    this.props.addProfileInfo(profile)
                    if (!profile[0]) {
                        browserHistory.push(`/profile/dev/edit/${user.user_id}`)
                    } else {
                        browserHistory.push(`/profile/dev/dashboard/${user.user_id}`)
                    }
                })}
        })
    }
    render() {
        return (

            <div>
            <div className="loginMove"> // logTitle (Matt Class)
                <h1 className="loginMove">Login</h1>
                <Input className="loginMove" placeholder='Username' onChange={(e) => this.usernameInput = e.target.value}/>
                <Input className="loginMove"  type='password' placeholder='Password' onChange={(e) => this.passwordInput = e.target.value}/>
                <Button className="loginMove"  content='Login' color="teal" onClick={() => this.login()}/>
            </div>
<<<<<<< HEAD
            <footer className="logfooter">
                <div className='footerContainer'>
                <footer className="logfooter">
                <Segment inverted className="logfooter">
=======
                <div className='footerContainer'>
                <footer className="logfooter">
                <Segment inverted className="logfooter">

>>>>>>> master

                  <Divider  color="orange" horizontal inverted className='dottitle' >.</Divider>

                </Segment>
<<<<<<< HEAD
               </footer>
                <Header textAlign='center'>
                    <Image className="loginvert" src={Logo} size='tiny'/>
                </Header>
              </div>
                </footer>


                    <Image className="loginvert" src={Logo} size='tiny'/>
=======
                </footer>


                    <Image className="loginvert" src={Logo} size='tiny'/>

                  </div>
>>>>>>> master

     </div>

        )
    }
    componentDidMount(){
      this.getSkills()
    }

}

export default Login
