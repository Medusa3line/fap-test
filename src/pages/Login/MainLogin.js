import React, { Component } from 'react';
import swal from 'sweetalert';
import Login from './Login';
import AgentSetup from './AgentSetup';
import PinCheck from './pinValidation';
import baseUrl from '../../baseUrl';

class MainLogin extends Component{
  state = {
    username: "",
    password: "",
    pin: "",
    route:"login",
    newPin: "",
    newPinAgain: '',
    newPassword: '',
    newPasswordAgain: '',
    loggingIn: false,
    loginError: false
  }    

  componentDidMount(){
    sessionStorage.clear();
  }

AgentSetupButton = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({
    loginError: false
  })
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
    this.setState({
      loggingIn: true
    })
    fetch (`${baseUrl}/oauth/agentSetup`, {
      method: 'post',
      headers: {'Content-Type' : 'application/json'}, 
      body: JSON.stringify(reqBody)
    }).then (response => response.json())
    .then(
      setupInformation => {
      if (setupInformation.respCode === "00") {
        swal("Successful Operation", "New Password and Pin have been set", "success")
        this.setState({
          route: 'login', 
          loggingIn: false
        })
        document.getElementById(id).disabled = false;
      } else {
        this.setState({
          route: 'AgentSetup', 
          loggingIn: false, 
          loginError: true
        })
        document.getElementById(id).disabled = false;
      }
    })
    .catch(err => {
      this.setState({
        loggingIn: false
      })
      document.getElementById(id).disabled = false;
      swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
    });
  }
}

pinValidation = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({
    loginError: false
  })

  if (this.state.pin === ""){
    swal("Failed Attempt", "Please fill all fields", "error")
  } else {
      this.setState({
        loggingIn: true
      })
    document.getElementById(id).disabled = true;
    let reqBody = {
      username: this.state.username,
      password: this.state.password,
      pin: this.state.pin
    };
    fetch(`${baseUrl}/oauth/logon`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(user => {       
        if(user.respCode === '00'){
          sessionStorage.setItem('userDetails', JSON.stringify(user.respBody));
          document.getElementById(id).disabled = false;
          
          // Redirect to Dashboard
          let { userType } = user.respBody;    
          userType = userType.toLowerCase();       
          if (userType === 'aggregator' || userType  === 'subaggregator') {
            this.props.history.push("/aggregator");
            } else if (userType  === 'sub agent' || userType  === 'sub-agent' || userType === 'subagent' || userType  === 'sole' || userType === 'sub_agent'){
              this.props.history.push("/dashboard");
            } else {
              swal("Login Failed", 'User type unknown', 'error')              
            } 
        } else {
            this.setState({
              loggingIn: false, 
              loginError: true
            })
            document.getElementById(id).disabled = false;
          }
      })
      .catch(err => {
        this.setState({
          loggingIn: false
        })
        document.getElementById(id).disabled = false;
        swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
      })
  }
  ;
}

onChange = (event) => {
  this.setState({
  [event.target.name]: event.target.value
})}

loginButtonClick = (e) => {
  e.preventDefault();
  let id = e.target.id;
  this.setState({
    loginError: false
  })
  let reqBody = {
    username: this.state.username,
    password: this.state.password,
    pin: this.state.pin
  };

    if(reqBody.username === '' || reqBody.password === ''){
      swal("Login Failed", "Username and Password Fields cannot empty", "error")
    } else {
      this.setState({
        loggingIn: true
      });
      document.getElementById(id).disabled = true;
    fetch(`${baseUrl}/oauth/logon`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(user => {
      document.getElementById(id).disabled = false;
      this.setState({
        loggingIn: false
      })
      if(user.respCode === '00'){
        if(user.respBody.isFirstTime === 'true'){
          this.setState({
            route: 'AgentSetup'
        })
        } else if(user.respBody.isFirstTime === 'false' && user.respBody.isNewDevice === 'true') {
          this.setState({
            route: 'pin'
          })
        } else if (user.respBody.isFirstTime === 'false' && user.respBody.isNewDevice === 'false'){          
          sessionStorage.setItem('userDetails', JSON.stringify(user.respBody)); 
          document.getElementById(id).disabled = false;

          // Redirect to Dashboard
          let { userType } = user.respBody;    
          userType = userType.toLowerCase();       
          if (userType === 'aggregator' || userType  === 'subaggregator') {
            this.props.history.push("/aggregator");
            } else if (userType  === 'sub agent' || userType  === 'sub-agent' || userType === 'subagent' || userType  === 'sole' || userType === 'sub_agent'){
              this.props.history.push("/dashboard");
            } else {
              swal("Login Failed", 'User type unknown', 'error')              
            }        
      }
    } else if(user.respCode === '96'){
        this.setState({
          route: 'login', 
          loginError: true
        })
      } else {
        this.setState({
          route: 'login', 
          loginError: true
        })
      }  
    }).catch(err => {
      document.getElementById(id).disabled = false;
      this.setState({
        loggingIn: false
      })
      swal("Login Failed", `${err}`, 'error')
    })
    }
}
routeChange = (route) => this.setState({
  route: route
})

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

  render(){
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
                    route === 'pin' ?
                      <PinCheck 
                        onChange={this.onChange}   
                        pinValidation={this.pinValidation} 
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