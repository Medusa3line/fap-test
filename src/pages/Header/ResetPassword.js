import React, { Component } from 'react';
import baseUrl from '../../baseUrl';
import IsLoading from '../../Components/isLoading/isLoading.js';
import swal from 'sweetalert';
import LoginError from '../../Components/loginError/LoginError';

class ResetPassword extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      loggingIn: false,
      loginError: false,
      agentName: ''
    }
  }
  onChange = (event) => { this.setState({[event.target.name]: event.target.value});}

  resetPassword = (e) => {
  let id = e.target.id;
  this.setState({loginError: false})

  let reqBody = {
	agentName: this.state.agentName,
   };

  if (this.state.agentName === ''){
    swal("Failed Attempt", "Please enter your username", "info")
  } else {
    document.getElementById(id).disabled = true;
    this.setState({loggingIn: true})
    fetch (`${baseUrl}/oauth/forgotpassword`, {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify(reqBody)
    }).then (response => response.json())
    .then(
      result => {
      if (result.respCode === "00") {
        swal("Successful Operation", "Your password has been reset, check your email for the new password.", "success")
        this.setState({loggingIn: false})
        this.props.history.push("/");
        document.getElementById(id).disabled = false;
      } else if (result.respCode === "96") {
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

  render() {
    const { loginError, loggingIn } = this.state;

    return (
    <div className="body">
          <div id="login-layout">
            <div id="fit-image">
            </div>
            <div className="animated zoomIn delay-2s">
              <div id="login-container">
                <div className="header">
                  <img src={require("../../img/logo.png")} width="100vw" height="55vh" alt="3LINE LOGO" /> <br /><br /><br />
                  <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Reset Password</p>
                </div><br/>

              {/*-- Agent Setup Form */}
                <div>
                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>
                          <input 
                            type="text" 
                            className="form-control" 
                            required="required"
                            placeholder="Enter your username"
                            autoComplete="autocomplete"
                            autoFocus="autofocus"
                            maxLength=""
                            name="agentName"
                            onChange={this.onChange} />
                        </div>
                      </div> <br/>
        
                      <div className="form-group">
                        <button 
                          type="submit" 
                          className="btn" 
                          style={{width: '66.67%'}}
                          id="login_button" 
                          onClick={this.resetPassword}>
                          {
                            loggingIn ? <IsLoading />
                            : 'Proceed'
                          }
                        </button>
                      </div>
                      {
                        loginError ? <LoginError /> : null
                      }
                </div>
              </div>
          </div>
        </div>
    </div>
    )
  }
	
}

export default ResetPassword;