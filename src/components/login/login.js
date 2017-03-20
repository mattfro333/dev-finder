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
              <h1 className="logTitle">Login</h1>
                <div className="logContainer loginMove">
                <Input className="loginMove" placeholder='Username' onChange={(e) => this.usernameInput = e.target.value}/>
                <Input className="loginMove"  type='password' placeholder='Password' onChange={(e) => this.passwordInput = e.target.value}/>
                <Button className="loginMove"  content='Login' color="teal" onClick={() => this.login()}/>
</div>
   <footer className="logfooter">

            <Segment inverted className="logfooter">
                  <inverted />
                  <Divider  color="orange" horizontal inverted className='dottitle' >.</Divider>
                </Segment>
                </footer>
                <Header textAlign='center'>
<Image className="loginvert" src={Logo} size='tiny'/>
                  </Header>


     </div>

        )
    }
}

export default Login
