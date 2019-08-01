import React, { Component } from 'react';
import swal from 'sweetalert';
import Login from './Login';
import AgentSetup from './AgentSetup';
import Otp from './Otp';
import baseUrl from '../../baseUrl';

class MainLogin extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      otp: "",
      route:"login",
      newPin: "",
      newPinAgain: '',
      newPassword: '',
      newPasswordAgain: '',
      loggingIn: false,
      userType: '',
      redirect: false,
      loginError: false
    }
  }

  componentDidMount (){
    localStorage.clear();
  }

AgentSetupButton = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({loginError: false})
  let reqBody = {
    newPassword: this.state.newPasswordAgain,
    newPin: this.state.newPinAgain,
    username: this.state.username
    };
  if (this.state.newPassword === '' || this.state.newPasswordAgain === '' || this.state.newPin === '' || this.state.newPinAgain === ''){
    swal("Failed Attempt", "Please fill all fields", "error")
  } else if ((this.state.newPassword !== this.state.newPasswordAgain) || (this.state.newPin !== this.state.newPinAgain)) {
    swal("Failed Attempt", "Passwords or Pins do not match", "error")
  } else if ((this.state.newPassword === this.state.newPasswordAgain) && (this.state.newPin === this.state.newPinAgain)) {
    document.getElementById(id).disabled = true;
    this.setState({loggingIn: true})
    fetch (`${baseUrl}/oauth/agentSetup`, {
      method: 'post',
      headers: {'Content-Type' : 'application/json'}, 
      body: JSON.stringify(reqBody)
    }).then (response => response.json())
    .then(
      setupInformation => {
      if (setupInformation.respCode === "00") {
        swal("Successful Operation", "New Password and Pin have been set", "success")
        this.setState({route: 'login', loggingIn: false})
        document.getElementById(id).disabled = false;
      } else {
        this.setState({route: 'AgentSetup', loggingIn: false, loginError: true})
        document.getElementById(id).disabled = false;
      }
    })
    .catch(err => {
      this.setState({loggingIn: false})
      document.getElementById(id).disabled = false;
      swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
    });
  }
}

otpButton = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({loginError: false})

  if (this.state.otp === ''){
    swal("Failed Attempt", "Please fill all fields", "error")
  } else {
      this.setState({loggingIn: true})
    document.getElementById(id).disabled = true;
    let reqBody = {
      username: this.state.username,
      password: this.state.password,
      otp: this.state.otp
      };
    fetch(`${baseUrl}/oauth/logon`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(user => {
        if(user.respCode === '00'){
          if(user.respBody.isFirstTime === 'false' && user.respBody.isNewDevice === 'false'){
            localStorage.setItem('userDetails', JSON.stringify(user.respBody));
            document.getElementById(id).disabled = false;
            this.setState({loggingIn: false, redirect: true});
            this.renderRedirect();
          } else {
            this.setState({loggingIn: false, loginError: true})
            document.getElementById(id).disabled = false;
          } 
        } else {
            this.setState({loggingIn: false, loginError: true})
            document.getElementById(id).disabled = false;
          }
      })
      .catch(err => {
        this.setState({loggingIn: false})
        document.getElementById(id).disabled = false;
        swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
      })
  }
  ;
}

onChange = (event) => { this.setState({[event.target.name]: event.target.value}); }

loginButtonClick = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({loginError: false})
  let reqBody = {
    username: this.state.username,
    password: this.state.password,
    otp: this.state.otp
    };

    if(reqBody.username === '' || reqBody.password === ''){
      swal("Login Failed", "Username and Password Fields cannot empty", "error")
    } else {
      this.setState({loggingIn: true});
      document.getElementById(id).disabled = true;
    fetch(`${baseUrl}/oauth/logon`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reqBody)
  }).then(response => response.json())
    .then(user => {
        this.setState({loggingIn: false})
        if(user.respCode === '00'){
          this.setState({userType: user.respBody.userType.toLowerCase()})
        if(user.respBody.isFirstTime === 'true'){
         this.setState({route: 'AgentSetup'})
          } else if(user.respBody.isFirstTime === 'false' && user.respBody.isNewDevice === 'true') {
            this.setState({route: 'otp'})
          } else if (user.respBody.isFirstTime === 'false' && user.respBody.isNewDevice === 'false'){
            localStorage.setItem('userDetails', JSON.stringify(user.respBody));
            document.getElementById(id).disabled = false;
            this.setState({ redirect: true});
            this.renderRedirect();
        }
      } else if(user.respCode === '96'){
            this.setState({route: 'login', loginError: true})
            document.getElementById(id).disabled = false;
          } else {
            this.setState({route: 'login', loginError: true})
            document.getElementById(id).disabled = false;
          }  
    }).catch(err => {
      this.setState({loggingIn: false})
      document.getElementById(id).disabled = false;
      swal("Login Failed", 'An error occured, please try again...', 'error')
    })
    }
}
routeChange = (route) => { this.setState({route: route}) }

// Manipulate Number input fields and Password fields for Pin to not accept anything other than numbers
manipulateNumber = (e) => {
  var inputKeyCode = e.keyCode ? e.keyCode : e.which;
  if (((inputKeyCode >= 48 && inputKeyCode <= 57) || (inputKeyCode >= 96 && inputKeyCode <= 105)) && (inputKeyCode != null)){
      if((e.target.value.length === e.target.maxLength) || (inputKeyCode === 45)){
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }
}

renderRedirect = () => {
  const { userType, redirect } = this.state;
  if (redirect && (userType === 'aggregator' || userType === 'subaggregator')) {
    this.props.history.push("/aggregator");
    } else if (redirect && (userType === 'sub agent' || userType === 'sub-agent' || userType === 'subagent' || userType === 'sole' || userType === 'sub_agent')){
      this.props.history.push("/dashboard");
    } else {
      swal("Login Failed", 'User type unknown', 'error')
    }
}

  render() {
    const { loggingIn, loginError, route } = this.state;
    return (
      <React.Fragment>
        {
          route === 'login' ?
              <Login 
                loginButtonClick={this.loginButtonClick} 
                onChange={this.onChange} 
                routeChange={this.routeChange}
                loggingIn = {loggingIn}
                loginError = {loginError}
              />
            : (
                route === 'AgentSetup' ?
                  <AgentSetup 
                    onChange={this.onChange} 
                    AgentSetupButton={this.AgentSetupButton} 
                    routeChange={this.routeChange}
                    loggingIn = {loggingIn}
                    loginError = {loginError}
                    manipulateNumber={this.manipulateNumber} 
                  />
                : (
                    route === 'otp' ?
                    <Otp 
                      onChange={this.onChange}   
                      otpButton={this.otpButton} 
                      loginError={loginError} 
                      loggingIn={loggingIn} 
                      manipulateNumber={this.manipulateNumber}
                    />
                    : 
                    route === 'login'
                  )
              )
        }
      </React.Fragment> 
    );  
  }
}

export default MainLogin;