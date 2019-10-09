import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';
import CustomButton from '../../Components/CustomButton/CustomButton.component.jsx';
import { LoginContext } from './MainLogin';

const Login = () => {
  const { onChange, loginButtonClick, loggingIn, loginError, pin, errorMessage } = useContext(LoginContext)
	return (
		<div className="body">
      <div id="login-layout">
        <div id="fit-image">
        </div>
        <div className="animated zoomIn delay-2s">
          <div id="login-container">
            <LoginContainerHeader content={<p>Welcome back! <br/> Please login to your account </p>} /> <br/>
            <form onSubmit={loginButtonClick}>
              <div className="form-group">
                <div className="col-md-9">
                  <input
                    type="text" 
                    className="form-control" 
                    required="required" 
                    autoFocus="autofocus" 
                    placeholder="Agent ID"
                    name="agentId"
                    autoComplete="autocomplete"
                    onChange={onChange} 
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-9">          
                  <input 
                    type="password" 
                    className="form-control" 
                    required="required"
                    autoComplete="autocomplete" 
                    placeholder="Enter PIN"
                    maxLength="4" 
                    name="pin"
                    value={pin}
                    onChange={(event) => onChange(event, true)}
                  />
                </div>
              </div>
            
              <CustomButton 
                loggingIn={loggingIn} 
                buttonClick={loginButtonClick}
                value={'Login'} 
              />
            </form>                  
              <div>
                <h6>Forgot your pin? <Link to="/resetPin" style={{color: '#ff0014'}}>Reset It</Link></h6> 
              </div>
              {
                loginError ? <LoginError errorMessage={errorMessage} /> : null
              }
            <Footer />
          </div>
        </div>
      </div> 
    </div>
	)
}

export default Login;