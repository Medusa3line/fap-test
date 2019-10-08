import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import baseUrl from '../../baseUrl';
import withTimeoutWithoutRestriction from '../../Components/HOCs/withTimeoutWithoutRestriction.hoc';
import { manipulateNumber } from '../../Utils/manipulateNumber';
import swal from '../../Utils/alert';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader';
import CustomButton from '../../Components/CustomButton/CustomButton.component';

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
          <div id="login-layout">
            <div id="fit-image">
            </div>
            <div className="animated zoomIn delay-2s">
              <div id="login-container">
                <LoginContainerHeader content={<p>Change Pin</p>} /><br/>

              {/*-- Agent Setup Form */}
                <div>
                    <form onSubmit={this.ChangePin}>
                      <div className="form-group">
                        <div className="col-md-9" >
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
                        <div className="col-md-9" >          
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
                        <div className="col-md-9" >          
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
        
                      <CustomButton 
                        loggingIn={loggingIn} 
                        buttonClick={this.ChangePin}
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

export default withTimeoutWithoutRestriction(withRouter(ChangePin));