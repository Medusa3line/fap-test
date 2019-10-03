import React from 'react';
import IsLoading from '../../Components/isLoading/isLoading.js';
import LoginError from '../../Components/loginError/LoginError';
import LoginContainerHeader from '../../Components/LoginContainerHeader/LoginContainerHeader.jsx';

const AgentSetup = ({ onChange, AgentSetupButton, loggingIn, loginError, manipulateNumber }) => {
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
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>
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
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
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
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
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
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{padding: '0'}}>          
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
        
                      <div className="form-group">
                        <button 
                          type="submit" 
                          className="btn"
                          style={{width: '66.67%'}}
                          id="login_button" 
                          onClick={AgentSetupButton}>
                          {
                            loggingIn ? <IsLoading />
                            : 'Proceed'
                          }
                        </button>
                      </div>
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