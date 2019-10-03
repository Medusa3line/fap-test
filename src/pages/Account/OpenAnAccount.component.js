import React from 'react';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import Header from '../Header/Header';
import FCMBAccount from './FCMB/FCMBaccount.component';

const OpenAnAccount = () => {  
  return (
    <div className="body">
      {/* <!-- Main Wrapper --> */}
      <div className="container-fluid" style={{padding: '0'}}>
        <Header />
        <div className="container-fluid" id="bottom-content">    
          <div id="main">   
            <div id="container">
              <div id="panel">
                <h4> Open a Bank Account </h4>
                <small style={{color: '#ff0014'}}>All fields are required * </small>
              </div>
              <div className="line"></div><br/>  
                <FCMBAccount />                              
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default withTimeout(OpenAnAccount);