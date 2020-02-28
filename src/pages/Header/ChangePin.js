import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { changePinUrl } from '../../Utils/baseUrl';
import withTimeoutWithoutRestriction from '../../Components/HOCs/withTimeoutWithoutRestriction.hoc';
import swal from '../../Utils/alert';
import { pinRegex } from '../../Utils/regex';
import { customPageTitle } from '../../Utils/customTitle';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader';
import CustomButton from '../../Components/CustomButton/CustomButton.component';
import LoginPageLayoutWrapper from '../../Components/LoginPageLayoutWrapper/loginPageLayoutWrapper';

const ChangePin = () => {
  customPageTitle('Change Pin');
  const [ state, setState ] = useState({
    userDetails : {},
    loggingIn: false,
    loginError: false,
    oldPin: '',
    newPin: '',
    newPinAgain: '',
    errorMessage: ''
  })

  const history = useHistory();

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: pinRegex(event)
    });
  }

  const changePin = (e) => {
    e.preventDefault();
  setState({
    ...state,
    loginError: false
  })
  if (state.newPin === '' || state.newPinAgain === '' || state.oldPin === '' ){
    swal("Failed Attempt", "Please fill all fields", "info")
  } else if (state.newPin !== state.newPinAgain) {
    swal("Failed Attempt", "New Pin do not match", "info")
  } else if (state.newPin === state.oldPin) {
    swal("Failed Attempt", "New Pin is thesame as Old Pin", "info")
  } else if (state.newPin === state.newPinAgain) {
    //Get User Information
    const { auth_token, username } = JSON.parse(sessionStorage.getItem('userDetails'));
    let reqBody = {
      username,
      newPin: state.newPin,
      oldpin: state.oldPin
    };
    setState({
      ...state,
      loggingIn: true
    })
    fetch (`${changePinUrl}`, {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json', 
        'Authorization': `Bearer ${auth_token}`
      }, 
      body: JSON.stringify(reqBody)
    }).then (response => response.json())
    .then(result => {
      if (result.respCode === "00") {
        swal("Successful Operation", "New Pin has been set.", "success");
        setState({
          ...state,
          loggingIn: false,
        })
        history.push("/");
      } else {
        swal('An Error Occured', `${result.respDescription}`, 'error')
        setState({
          ...state,
          loggingIn: false, 
          loginError: true,
          errorMessage: result.respDescription
        })
      }
    })
    .catch(err => {
      setState({
        ...state,
        loggingIn: false
      })
      swal('An Error Occured', `${err}`, 'error')
    });
  }
}

  const { loginError, loggingIn, oldPin, newPin, newPinAgain, errorMessage } = state;
  return (
    <LoginPageLayoutWrapper>
      <div id="login-container">
        <LoginContainerHeader content="Change Pin" /><br/>
        <div>
          <form onSubmit={changePin}>
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
                  value={oldPin}
                  onChange={onChange}
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
                  value={newPin}
                  onChange={onChange}
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
                  value={newPinAgain}
                  onChange={onChange}
                />
              </div>
            </div> <br/>

            <div className="form-group">
              <div className="col-md-9" >
                <CustomButton 
                  loggingIn={loggingIn} 
                  buttonClick={changePin}
                  value={'Proceed'}
                />
              </div>
            </div>
          </form>
          {
            loginError ? <LoginError errorMessage={errorMessage} /> : null
          }
        </div>
      </div>
    </LoginPageLayoutWrapper>
  )	
}
export default withTimeoutWithoutRestriction(ChangePin);