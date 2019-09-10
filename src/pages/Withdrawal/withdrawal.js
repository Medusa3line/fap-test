import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import withTimeout from "../../Components/HOCs/withTimeout.hoc"

import Header from '../Header/Header';
import Balance from '../../Components/Balance/Balance';
import GTBCashout from './gtb/GTBCashout';
import FidelityCashout from './fidelity/FidelityCashout';

const withdrawal = () => {
  const [bank, setBank] = useState('');
  const selectedBank = (e) => {
    setBank(e.target.value)
  }
    return (
      <div className="body">
        {/* <!-- Main Wrapper --> */}
        <div className="container-fluid"  style={{padding: '0'}}>      
          <Header />  
          <div className="container-fluid" id="bottom-content">    
            <div id="main">   
              <div id="container">
                <div id="panel">
                  <h4> Withdrawal</h4>
                  <h6> Withdraw money from a bank account </h6>
                </div> 
                <div className="line"></div><br/>     
                <Balance /> 
                <div className="form-horizontal">
                  <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12"> 
                      <select className="form-control" required="required" onChange={selectedBank} name="selectedBank">
                        <option value="">Select a Bank</option>
                        <option value="fidelity">Fidelity Bank</option>
                        <option value="gtb">Guaranty Trust Bank</option>
                      </select>
                    </div>
                  </div>
                </div> 
                {
                  bank === 'gtb' ? <GTBCashout /> : (
                    bank === 'fidelity' ? <FidelityCashout /> : null
                  ) 
                }               
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default withTimeout(withRouter(withdrawal));