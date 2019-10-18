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
  let id = e.target.id;
  setState({
    ...state,
    loginError: false
  })
  if (state.newPin === '' || state.newPinAgain === '' || state.oldPin === '' ){
    swal("Failed Attempt", "Please fill all fields", "info")
  } else if (state.newPin !== state.newPinAgain) {
    swal("Failed Attempt", "New Pins do not match", "info")
  } else if (state.newPin === state.newPinAgain) {
    //Get User Information
    const { auth_token, username } = JSON.parse(sessionStorage.getItem('userDetails'));
    let reqBody = {
      username,
      newPin: state.newPin,
      oldpin: state.oldPin
    };
    document.getElementById(id).disabled = true;
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
      document.getElementById(id).disabled = false;
      if (result.respCode === "00") {
        swal("Successful Operation", "New Pin has been set.", "success");
        setState({
          ...state,
          loggingIn: false,
        })
        renderRedirect();
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
      document.getElementById(id).disabled = false;
      swal('An Error Occured', `${err}`, 'error')
    });
  }
}

  const renderRedirect = () => {
    let { userType } = JSON.parse(sessionStorage.getItem('userDetails'));
    userType = userType.toLowerCase();
    if ( userType === 'aggregator') {
      history.push("/aggregator");
      } else if (userType  === 'operator' || userType  === 'agent'){
        history.push("/dashboard");
      } else {
        history.push("/");
      }
}

    const { loginError, loggingIn, oldPin, newPin, newPinAgain, errorMessage } = state;

    return (
    <div className="body">
      <div id="login-layout">
        <div id="fit-image">
        </div>
        <div className="animated zoomIn delay-2s">
          <div id="login-container">
            <LoginContainerHeader content={<p>Change Pin</p>} /><br/>

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
  
                <CustomButton 
                  loggingIn={loggingIn} 
                  buttonClick={changePin}
                  value={'Proceed'}
                />
              </form>
              {
                loginError ? <LoginError errorMessage={errorMessage} /> : null
              }
            </div>
          </div>
      </div>
      </div>
    </div>
    )	
}

export default withTimeoutWithoutRestriction(ChangePin);