import React from 'react';
import {Link} from 'react-router-dom';
import IsLoading from '../../Components/isLoading/isLoading.js';
import LoginError from '../../Components/loginError/LoginError';

const Otp = ({ onChange, otpButton, loggingIn, loginError, manipulateNumber }) => {
  return (
    <div className="body">
      <div className="row" style={{margin: '0'}}>
        <div id="fit-image" className="col-lg-6 col-md-6">
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-2s">
          <div id="login-container">
            <div className="header">
              <img src={require("../../img/logo.png")} width="100vw" height="55vh" alt="3LINE LOGO" /> <br /><br /><br/>
              <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Please enter agent Pin. </p>
            </div><br/>

          {/*-- Login Form */}
                <form onSubmit={otpButton}>
                  <div className="form-group">
                    <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                      <input 
                        type="password" 
                        className="form-control" 
                        required="required" 
                        id="otp"
                        autoFocus="autofocus" 
                        placeholder="Enter Pin"
                        maxLength="4"
                        name="otp" 
                        onChange={onChange} 
                        onKeyPress={manipulateNumber}
                      />
                    </div>
                  </div>
    
                  <div className="form-group">
                    <button 
                      type="submit"
                      style={{width: '66.67%'}}
                      className="btn" 
                      id="login_button" 
                      onClick={otpButton}>
                      {
                        loggingIn ? <IsLoading />
                        : 'Proceed'
                      }
                    </button>
                  </div>
                </form>
                  
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div>
                    <h6>Can't remember your Password? <Link to="/resetPassword" style={{color: '#ff0014'}}> Reset it </Link></h6> 
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

export default Otp;