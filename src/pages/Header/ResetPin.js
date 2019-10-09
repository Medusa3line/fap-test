import React, { useState } from 'react';
import baseUrl from '../../baseUrl';
import swal from '../../Utils/alert';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader';
import CustomButton from '../../Components/CustomButton/CustomButton.component';

const ResetPin = ({ history }) => {
    const [ state, setState ] = useState({
      loggingIn: false,
      loginError: false,
      agentId: ''
   })
  
  const onChange = (event) => { 
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  const resetPin = (e) => {
    e.preventDefault();
    let id = e.target.id;
    setState({
      ...state,
      loginError: false
    })

    let reqBody = {
      agentId: state.agentId,
    };

    if (state.agentId === ''){
      swal("Failed Attempt", "Please enter your Agent Id", "info")
    } else {
      document.getElementById(id).disabled = true;
      setState({
        ...state,
        loggingIn: true
      })
      fetch (`${baseUrl}/forgotpin`, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(reqBody)
      }).then (response => {
        response.json();
      })
      .then(result => {
        document.getElementById(id).disabled = false;
        if (result.respCode === "00") {
          swal("Successful Operation", "Your pin has been reset, check your email for the new pin.", "success")
          setState({
            ...state,
            loggingIn: false
          })
          history.push("/");
        } else {
          swal('An Error Occured', `${result.respDescription}`, 'error')
          setState({
            ...state,
            loggingIn: false, 
            loginError: true
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

  const { loginError, loggingIn } = state;
  return (
  <div className="body">
        <div id="login-layout">
          <div id="fit-image">
          </div>
          <div className="animated zoomIn delay-2s">
            <div id="login-container">
              <LoginContainerHeader content={<p>Reset Pin</p>} /><br/>

            {/*-- Agent Setup Form */}
              <form onSubmit={resetPin}>
                <div className="form-group">
                  <div className="col-md-9" >
                    <input 
                      type="text" 
                      className="form-control" 
                      required="required"
                      placeholder="Enter your Agent Id"
                      autoComplete="autocomplete"
                      autoFocus="autofocus"
                      maxLength=""
                      name="agentId"
                      onChange={onChange} />
                  </div>
                </div> <br/>
  
                <CustomButton 
                  loggingIn={loggingIn} 
                  buttonClick={resetPin}
                  value={'Proceed'}
                />
                {
                  loginError ? <LoginError /> : null
                }
              </form>
            </div>
        </div>
      </div>
  </div>
  )
}
export default ResetPin;