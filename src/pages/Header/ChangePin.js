import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import baseUrl from '../../baseUrl';
import IsLoading from '../../Components/isLoading/isLoading.js';
import withTimeoutWithoutRestriction from '../../Components/HOCs/withTimeoutWithoutRestriction.hoc';
import { manipulateNumber } from '../../manipulateNumber';
import swal from 'sweetalert';
import LoginError from '../../Components/loginError/LoginError';

class ChangePin extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {},
      changeRoute: false,
      loggingIn: false,
      loginError: false,
      oldPin: '',
      newPin: '',
      newPinAgain: '', 
      userType: ''
    }
  }

  onChange = (event) => { this.setState({[event.target.name]: event.target.value});}

  ChangePin = (e) => {
    e.preventDefault();
  let id = e.target.id;
  this.setState({loginError: false})
  let reqBody = {
    agentUsername: this.state.userDetails.agentUsername,
    newPin: this.state.newPin,
    oldPin: this.state.oldPin
    };
  if (this.state.newPin === '' || this.state.newPinAgain === '' || this.state.oldPin === '' ){
    swal("Failed Attempt", "Please fill all fields", "info")
  } else if (this.state.newPin !== this.state.newPinAgain) {
    swal("Failed Attempt", "New Pins do not match", "error")
  } else if (this.state.newPin === this.state.newPinAgain) {
    document.getElementById(id).disabled = true;
    this.setState({loggingIn: true})
    let auth_token = this.state.userDetails.auth_token;
    fetch (`${baseUrl}/oauth/changepin`, {
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
        swal("Successful Operation", "New Pin has been set.", "success");
        document.getElementById(id).disabled = false;
        this.setState({loggingIn: false, changeRoute: true, userType: this.state.userDetails.userType.toLowerCase()})
        this.renderRedirect();
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

  componentDidMount = async () => {
    this._isMounted = true;

    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }) 
  }

  renderRedirect = () => {
    const { changeRoute, userType } =  this.state;
    if (changeRoute && ( userType === 'aggregator' || userType === 'subaggregator')) {
      this.props.history.push("/aggregator");
      } else if (changeRoute && (userType === 'sub agent' || userType === 'sub-agent' || userType === 'subagent' || userType === 'sole' || userType === 'sub_agent')){
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/");
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
                  <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Change Pin</p>
                </div><br/>

              {/*-- Agent Setup Form */}
                <div>
                    <form onSubmit={this.ChangePin}>
                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            placeholder="Enter Old Pin"
                            autoComplete="autocomplete"
                            autoFocus="autofocus"
                            maxLength="4"
                            name="oldPin"
                            onChange={this.onChange}
                            onKeyPress={(e) => manipulateNumber(e)}
                          />
                        </div>
                      </div> 
                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Enter New Pin"
                            maxLength="4" 
                            name="newPin"
                            onChange={this.onChange}
                            onKeyPress={(e) => manipulateNumber(e)}
                          />
                        </div>
                      </div> 

                      <div className="form-group">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Confirm  New Pin"
                            maxLength="4"
                            name="newPinAgain" 
                            onChange={this.onChange}
                            onKeyPress={(e) => manipulateNumber(e)}
                          />
                        </div>
                      </div> <br/>
        
                      <div className="form-group">
                        <button 
                          type="submit" 
                          className="btn"
                          style={{width: '66.67%'}}
                          id="login_button" 
                          onClick={this.ChangePin}>
                          {
                            loggingIn ? <IsLoading />
                            : 'Proceed'
                          }
                        </button>
                      </div>
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

export default withTimeoutWithoutRestriction(withRouter(ChangePin));