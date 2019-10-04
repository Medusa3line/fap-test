import React from 'react';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';
import { manipulateNumber } from '../../Utils/manipulateNumber';
import CustomButton from '../../Components/CustomButton/CustomButton.component.jsx';

const AgentSetup = ({ onChange, AgentSetupButton, loggingIn, loginError }) => {
	return (
		<div className="body">
          <div id="login-layout">
            <div id="fit-image">
            </div>
            <div className="animated zoomIn delay-2s">
              <div id="login-container">
                <LoginContainerHeader content={<p>Set New Password and PIN</p>} /><br/>

              {/*-- Agent Setup Form */}
                  <div>
                    <form onSubmit={AgentSetupButton}>
                      <div className="form-group">
                        <div className="col-md-9" >
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            placeholder="Enter New Password"
                            autoComplete="autocomplete"
                            autoFocus="autofocus"
                            name="newPassword"
                            onChange={onChange} />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-9" >          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Confirm Password" 
                            name="newPasswordAgain"
                            onChange={onChange} />
                        </div>
                      </div> 
                      <div className="form-group">
                        <div className="col-md-9" >          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Enter New PIN"
                            maxLength="4" 
                            name="newPin"
                            onChange={onChange}
                            onKeyPress={manipulateNumber}
                          />
                        </div>
                      </div> 

                      <div className="form-group">
                        <div className="col-md-9" >          
                          <input 
                            type="password" 
                            className="form-control" 
                            required="required"
                            autoComplete="autocomplete" 
                            placeholder="Confirm PIN"
                            maxLength="4"
                            name="newPinAgain" 
                            onChange={onChange}
                            onKeyPress={manipulateNumber} 
                          />
                        </div>
                      </div> <br/>
        
                      <CustomButton 
                        loggingIn={loggingIn} 
                        buttonClick={AgentSetupButton}
                      />
                    </form>
                      {
                        loginError ? <LoginError /> : null
                      }
                </div>
              </div>
          </div>
        </div>
    </div>
		)
}

export default AgentSetup;