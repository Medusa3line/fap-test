import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import baseUrl from '../../baseUrl';
import withTimeoutWithoutRestriction from '../../Components/HOCs/withTimeoutWithoutRestriction.hoc';
import swal from '../../Utils/alert';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader';
import CustomButton from '../../Components/CustomButton/CustomButton.component';

class ChangePassword extends Component {
  _isMounted = false;

    state = {
      userDetails : {},
      loggingIn: false,
      loginError: false,
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
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
      swal('An Error Occured', `${err}`, 'error')
    });
  }
}

  componentDidMount = async () => {
    this._isMounted = true;

    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }) 
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
                <LoginContainerHeader content={<p>Change Password</p>} /><br/>

              {/*-- Agent Setup Form */}
                <div>
                    <form onSubmit={this.ChangePassword}>
                      <div className="form-group">
                        <div className="col-md-9" >
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
                        <div className="col-md-9" >          
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
                        <div className="col-md-9" >          
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
        
                      <CustomButton 
                        loggingIn={loggingIn} 
                        buttonClick={this.ChangePassword}
                      />
                    </form>
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

export default withTimeoutWithoutRestriction(withRouter(ChangePassword));