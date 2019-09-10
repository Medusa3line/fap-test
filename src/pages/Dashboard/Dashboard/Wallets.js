import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

const Wallets = ({ walletBalance, incomeBalance, history }) => {
  const [userDetails, setUserDetails] = useState(0);
  useEffect(() => {
    sessionStorage.getItem('userDetails') &&
      setUserDetails(JSON.parse(sessionStorage.getItem('userDetails')))
  }, [])

  return (
    <div>
      <div className="container middle-panel" style={{padding: '0px', paddingTop: '20px'}}>
        <div className="row" id="stats-top-most-card" style={{padding: '0px'}}>
          <div className="row" style={{margin: '0px'}}>
            <div className="row" id="stats-card-row-dashboard">
              <div id="dashboard-card" onClick={() => history.push(`/myTradingWallet/${userDetails.agentId}`)}>
                <h6> Trading Wallet</h6>
                <h4 id="first-aggregator-count" style={{fontWeight: 'bold'}}>₦ {walletBalance} </h4> <img id="dashboard-count-image" alt="" src={require("../../../img/bar_chart_4.svg")} />
              </div>
              <div id="dashboard-card" onClick={() => history.push(`/myIncomeWallet/${userDetails.agentId}`)}>
                <h6> Income Wallet</h6> 
                <h4 id="first-aggregator-count" style={{fontWeight: 'bold'}}>₦ {incomeBalance} </h4> <img id="dashboard-count-image" alt="" src={require("../../../img/bar_chart_5.svg")} />
              </div>
              <div id="dashboard-card-side" onClick={() => history.push(`/fundWallet`)}>
                <h6> Fund Wallet</h6> 
                <button className="btn btn-sm" id="credit_request_arrow">Fund Wallet &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Wallets);