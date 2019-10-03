import React from 'react';
import {Link} from 'react-router-dom';
import IsLoading from '../../Components/isLoading/isLoading.js';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';

const Otp = ({ onChange, pinValidation, loggingIn, loginError, manipulateNumber }) => {
  return (
    <div className="body">
      <div id="login-layout">
        <div id="fit-image">
        </div>
        <div className="animated zoomIn delay-2s">
          <div id="login-container">
            <LoginContainerHeader content={<p>Please enter agent Pin. </p>} /> <br/>

          {/*-- Login Form */}
                <form onSubmit={pinValidation}>
                  <div className="form-group">
                    <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
                      <input 
                        type="password" 
                        className="form-control" 
                        required="required" 
                        id="pin"
                        autoFocus="autofocus" 
                        placeholder="Enter Pin"
                        maxLength="4"
                        name="pin" 
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
                      onClick={pinValidation}>
                      {
                        loggingIn ? <IsLoading />
                        : 'Proceed'
                      }
                    </button>
                  </div>
                </form>
                  
                  <div>
                    <h6>Can't remember your Password? <Link to="/resetPassword" style={{color: '#ff0014'}}> Reset it </Link></h6> 
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

export default Otp;