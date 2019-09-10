import React from 'react';
import { Link } from 'react-router-dom';
import IsLoading from '../../Components/isLoading/isLoading.js';
import LoginError from '../../Components/loginError/LoginError';

const Login = ({ onChange, loginButtonClick, loggingIn, loginError }) => {
	return (
		<div className="body">
            {/*-- Login Form */}

            <div className="row" style={{margin: '0'}}>
              <div id="fit-image" className="col-lg-6 col-md-6">
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-2s">
                <div id="login-container">
                  <div className="header">
                    <img src={require("../../img/logo.png")} width="25%" height="25%" alt="3LINE LOGO" /> <br /><br /><br/>
                    <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Welcome back! <br/> Please login to your account </p>
                  </div><br/>
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

                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div>
                        <h6>Forgot your password? <Link to="/resetPassword" style={{color: '#ff0014'}}>Reset It</Link></h6> 
                      </div>
                    </div>
                    {
                      loginError ? <LoginError /> : null
                    }
                <footer>
                  <p className="text-center" style={{fontSize: '11px'}}>Powered by <img src={require("../../img/3line_logo.png")} style={{marginLeft: '5px'}} alt="3LINE CARD MANAGEMENT LIMITED" /> </p>
                </footer>
                </div>
              </div>
            </div> 
    </div>
		)
}

export default Login;