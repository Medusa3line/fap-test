import React, { useState, useEffect, createContext } from 'react';
import swal from '../../Utils/alert';
import Login from './Login.component';
import { loginUrl } from '../../Utils/baseUrl';
import { pinRegex } from '../../Utils/regex';
import { customPageTitle } from '../../Utils/customTitle';

export const LoginContext = createContext();
const MainLogin = ({history}) => {
  customPageTitle('Login');
  const [state, setState] = useState({
    agentId: '',
    pin: '',
    loggingIn: false,
    loginError: false,
    errorMessage: ''
  })   

  useEffect(() => {
    sessionStorage.clear();
  }, [])

const onChange = (event, option) => {
  if(option){
    setState({
      ...state,
      [event.target.name]: pinRegex(event)
    });
  } else {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
}

const loginButtonClick = (e) => {
  e.preventDefault();
  let id = e.target.id;
  const { agentId, pin } = state;
    let reqBody = {
      agentId,
      pin,
    };

    if(pin === '' || agentId === ''){
      swal("Wrong Operation", "All Fields are Required", "error")
    } else {
      setState({
        ...state,
        loggingIn: true,
        loginError: false
      });
      document.getElementById(id).disabled = true;
    fetch(`${loginUrl}`, {
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
          loginError: true,
          errorMessage: user.respDescription
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

  const { loggingIn, loginError, errorMessage, pin } = state;

  return (
    <LoginContext.Provider value={{
      loginButtonClick, 
      onChange, 
      loggingIn,
      loginError,
      errorMessage,
      pin
    }}>
      <Login /> 
    </LoginContext.Provider>
  ); 
}

export default MainLogin;