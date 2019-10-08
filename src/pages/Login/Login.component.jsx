import React from 'react';
import { Link } from 'react-router-dom';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';
import { manipulateNumber } from '../../Utils/manipulateNumber';
import CustomButton from '../../Components/CustomButton/CustomButton.component.jsx';

const Login = ({ onChange, loginButtonClick, loggingIn, loginError }) => {
	return (
		<div className="body">
            {/*-- Login Form */}

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
                          type="text" 
                          className="form-control" 
                          required="required"  
                          placeholder="Terminal ID"
                          name="terminalId"
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
                          onChange={onChange}
                          onKeyPress={manipulateNumber}
                        />
                      </div>
                    </div>
                  
                    <CustomButton 
                      loggingIn={loggingIn} 
                      buttonClick={loginButtonClick} 
                    />
                  </form>                  
                    <div>
                      <h6>Forgot your password? <Link to="/resetPassword" style={{color: '#ff0014'}}>Reset It</Link></h6> 
                    </div>
                    {
                      loginError ? <LoginError /> : null
                    }
                  <Footer />
                </div>
              </div>
            </div> 
    </div>
		)
}

export default Login;