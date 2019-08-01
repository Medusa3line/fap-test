import React from 'react';
import IsLoading from '../../isLoading.js';

const AgentSetup = ({ onChange, AgentSetupButton, routeChange, loggingIn, loginError, manipulateNumber }) => {
	return (
		<div className="body">
          <div className="row" style={{margin: '0'}}>
            <div id="fit-image" className="col-lg-6 col-md-6">
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-2s">
              <div id="login-container">
                <div className="header">
                  <img src={require("../../img/logo.png")} width="100vw" height="55vh" alt="3LINE LOGO" /> <br /><br /><br />
                  <p style={{fontSize: '16px', color: '#4d4f5c', fontWeight: 'bolder'}}>Set New Password and PIN</p>
                </div><br/>

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
        
                        <div className="form-group col-sm-12 col-md-12 col-lg-12" style={{padding: '0'}}>
                          <button 
                            type="submit" 
                            className="btn btn-danger" 
                            style={{width: '66.66667%'}}
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
                          loginError ? <div className="alert alert-danger alert-dismissible out" style={{padding: '5px',width: '20%', position: 'fixed', right: '1%', top: '1%', fontSize: '12px'}}>
                            Wrong credentials provided
                          </div> : null
                        }
                </div>
              </div>
          </div>
        </div>
    </div>
		)
}

export default AgentSetup;