import React from 'react';
import { Link } from 'react-router-dom';
import IsLoading from '../../Components/isLoading/isLoading.js';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';

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
                      <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>
                        <input
                          type="text" 
                          className="form-control" 
                          required="required" 
                          autoFocus="autofocus" 
                          placeholder="Username"
                          name="username"
                          autoComplete="autocomplete"
                          onChange={onChange} 
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
                          placeholder="Password" 
                          name= "password"
                          onChange={onChange} />
                      </div>
                    </div>
                  
                    <div className="form-group" >        
                      <button 
                        type="submit"
                        style={{width: '66.67%'}}
                        className="btn" 
                        id="login_button" 
                        onClick={loginButtonClick}>
                        {
                          loggingIn ? <IsLoading />
                          : 'Login'
                        }
                      </button>
                    </div>
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