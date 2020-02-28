import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';
import CustomButton from '../../Components/CustomButton/CustomButton.component.jsx';
import { LoginContext } from './MainLogin';

const Login = () => {
  const { onChange, loginButtonClick, loggingIn, loginError, pin, errorMessage } = useContext(LoginContext)
	return (
    <Fragment>
      <div id="login-container">
        <LoginContainerHeader content="Welcome! Please login to your account." /> <br/>
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

          <div className="form-group">
            <div className="col-md-9">
              <CustomButton 
                loggingIn={loggingIn} 
                buttonClick={loginButtonClick}
                value={'Login'} 
              />
            </div>
          </div>
          
        </form>                  
          <div>
            <h6>Forgot your pin? <Link to="/resetPin" style={{color: '#ff0014'}}>Reset It</Link></h6> 
          </div>
          {
            loginError ? <LoginError errorMessage={errorMessage} /> : null
          }
        <Footer />
      </div>
    </Fragment>
	)
}

export default Login;