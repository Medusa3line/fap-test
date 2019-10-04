import React from 'react';
import {Link} from 'react-router-dom';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import Footer from '../../Components/Footer/Footer.component.jsx';
import { manipulateNumber } from '../../Utils/manipulateNumber';
import CustomButton from '../../Components/CustomButton/CustomButton.component.jsx';

const Otp = ({ onChange, pinValidation, loggingIn, loginError }) => {
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
                    <div className="col-md-9" >          
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
    
                  <CustomButton 
                    loggingIn={loggingIn} 
                    buttonClick={pinValidation}
                  />
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