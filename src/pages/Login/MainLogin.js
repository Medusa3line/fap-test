import React, { useState, useEffect } from 'react';
import swal from '../../Utils/alert';
import Login from './Login.component';
import baseUrl from '../../baseUrl';

const MainLogin = ({history}) => {
  const [state, setState] = useState({
    agentId: '',
    terminalId: '',
    pin: '',
    loggingIn: false,
    loginError: false
  })   

  useEffect(() => {
    sessionStorage.clear();
  }, [])

const onChange = (event) => {
  setState({
    ...state,
  [event.target.name]: event.target.value
})}

const loginButtonClick = (e) => {
  e.preventDefault();
  let id = e.target.id;
  const { agentId, terminalId, pin } = state;
    let reqBody = {
      agentId,
      deviceId: terminalId,
      pin,
      terminalId
    };

    if(pin === '' || terminalId === '' || agentId === ''){
      swal("Wrong Operation", "All Fields are Required", "error")
    } else {
      setState({
        ...state,
        loggingIn: true,
        loginError: false
      });
      document.getElementById(id).disabled = true;
    fetch(`${baseUrl}/login`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(user => {
      document.getElementById(id).disabled = false;
      setState({
        ...state,
        loggingIn: false
      })
      if(user.respCode === '00'){          
        sessionStorage.setItem('userDetails', JSON.stringify(user.respBody)); 
        document.getElementById(id).disabled = false;   
        redirectToDashboard(user.respBody.userType)    
      } else {
        setState({
          ...state, 
          loginError: true
        })
      }  
    }).catch(err => {
      document.getElementById(id).disabled = false;
      setState({
        ...state,
        loggingIn: false
      })
      swal("Login Failed", `${err}`, 'error')
    })
  }
}

const redirectToDashboard = (userType) => {
  // Redirect to Dashboard    
  userType = userType.toLowerCase();       
  if (userType === 'aggregator') {
    history.push("/aggregator")
    } else if (userType  === 'operator' || userType  === 'agent'){
      history.push("/dashboard")
    } else {
      swal("Login Failed", 'User type unknown', 'error')              
    } 
}

  const { loggingIn, loginError } = state;

  return (
    <Login 
      loginButtonClick={loginButtonClick} 
      onChange={onChange} 
      loggingIn = {loggingIn}
      loginError = {loginError}
    /> 
  ); 
}

export default MainLogin;