import React, { Component } from 'react';
import baseUrl from '../../baseUrl';
import IsLoading from '../../isLoading.js';
import {TimeOut} from '../../timeOut';
import swal from 'sweetalert';

class ChangePassword extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false,
      loggingIn: false,
      loginError: false,
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    }
  }

// For Setting Time Out
clearTimeoutFunc = () => { if (this.logoutTimeout) {clearTimeout(this.logoutTimeout)}; };
setTimeout = () => { this.logoutTimeout = setTimeout(this.logout, TimeOut); };
resetTimeout = () => { this.clearTimeoutFunc(); this.setTimeout(); };
logout = () => { localStorage.clear(); if(this._isMounted){ this.props.history.push("/"); alert('Your session timed out'); } };

// Cancelling subscriptions
componentWillUnmount(){
  this._isMounted = false;
}

  onChange = (event) => { this.setState({[event.target.name]: event.target.value});}

  ChangePassword = (e) => {
    e.preventDefault();
  let id = e.target.id;
  this.setState({loginError: false})
  let reqBody = {
    agentUsername: this.state.userDetails.agentUsername,
    newPassword: this.state.newPassword,
    oldPassword: this.state.oldPassword
    };
  if (this.state.newPassword === '' || this.state.newPasswordAgain === '' || this.state.oldPassword === '' ){
    swal("Failed Attempt", "Please fill all fields", "info")
  } else if (this.state.newPassword !== this.state.newPasswordAgain) {
    swal("Failed Attempt", "New Passwords do not match", "error")
  } else if (this.state.newPassword === this.state.newPasswordAgain) {
    document.getElementById(id).disabled = true;
    this.setState({loggingIn: true})
    let auth_token = this.state.userDetails.auth_token;
    fetch (`${baseUrl}/oauth/changepassword`, {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json', 
        'Authorization': `Bearer ${auth_token}`
      }, 
      body: JSON.stringify(reqBody)
    }).then (response => response.json())
    .then(
      result => {
      if (result.respCode === "00") {
        swal("Successful Operation", "New Password has been set. You will have to login again with this new password", "success")
        this.setState({loggingIn: false})
        this.props.history.push("/");
        document.getElementById(id).disabled = false;
      } else if (result.respCode === "96") {
        swal("Wrong credentials", "Old Password provided is incorrect", "error")
        this.setState({loggingIn: false, loginError: true})
        document.getElementById(id).disabled = false;
      } else {
        swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
        this.setState({loggingIn: false, loginError: true})
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

  componentDidMount = async () => {
    this._isMounted = true;

    await localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })

    if(!localStorage.getItem('userDetails')){
      this.setState({redirect: true})
    } 

// Handling timeout when there is no event
     this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) { window.addEventListener(this.events[i], this.resetTimeout); } 
    this.setTimeout(); //End of Timeout handling
  }

  render() {
    if (this.state.redirect){
    this.props.history.push("/");   
  }
    const { loginError, loggingIn } = this.state;

    return (
    <div className="body">
          <div className="row" style={{margin: '0'}}>
            <div id="fit-image" className="col-lg-6 col-md-6">
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-2s">
              <div id="login-container">
                <div className="header">
                  <img src={require("../../img/logo.png")} width="100vw" height="55vh" alt="3LINE LOGO" /> <br /><br /><br />
                  <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Change Password</p>
                </div><br/>

              {/*-- Agent Setup Form */}
                <div>
                    <form onSubmit={this.ChangePassword}>
                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            placeholder="Enter Old Password"
                            autoComplete="autocomplete"
                            autoFocus="autofocus"
                            name="oldPassword"
                            onChange={this.onChange} />
                        </div>
                      </div> 
                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Enter New Password"
                            maxLength="" 
                            name="newPassword"
                            onChange={this.onChange} />
                        </div>
                      </div> 

                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Confirm  New Password"
                            maxLength=""
                            name="newPasswordAgain" 
                            onChange={this.onChange} />
                        </div>
                      </div> <br/>
        
                        <div className="form-group col-sm-12 col-md-12 col-lg-12" style={{padding: '0'}}>
                          <button 
                            type="submit" 
                            className="btn btn-danger" 
                            style={{width: '66.66667%'}}
                            id="login_button" 
                            onClick={this.ChangePassword}>
                            {
                              loggingIn ? <IsLoading />
                              : 'Proceed'
                            }
                          </button>
                        </div>
                      </form>
                      {
                          loginError ? <div className="alert alert-danger alert-dismissible out" style={{padding: '5px',width: '20%', position: 'fixed', right: '1%', top: '1%', fontSize: '12px'}}>
                            Wrong credentials provided
                          </div> : null
                        }
                </div>
              </div>
          </div>
        </div>
    </div>
    )
  }
	
}

export default ChangePassword;