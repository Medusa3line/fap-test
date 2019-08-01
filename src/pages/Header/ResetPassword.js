import React, { Component } from 'react';
import baseUrl from '../../baseUrl';
import IsLoading from '../../isLoading.js';
import swal from 'sweetalert';

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
          <div className="row" style={{margin: '0'}}>
            <div id="fit-image" className="col-lg-6 col-md-6">
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-2s">
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
        
                        <div className="form-group col-sm-12 col-md-12 col-lg-12" style={{padding: '0'}}>
                          <button 
                            type="submit" 
                            className="btn btn-danger" 
                            style={{width: '66.66667%'}}
                            id="login_button" 
                            onClick={this.resetPassword}>
                            {
                              loggingIn ? <IsLoading />
                              : 'Proceed'
                            }
                          </button>
                        </div>
                      {
                          loginError ? <div className="alert alert-danger alert-dismissible out" style={{padding: '5px',width: '20%', position: 'fixed', right: '1%', top: '1%', fontSize: '12px'}}>
                            Wrong username provided
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

export default ResetPassword;