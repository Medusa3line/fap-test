import React from 'react';
import { withRouter } from 'react-router-dom';

const Wallets = ({ walletBalance, history }) => {
  return (
    <div>
      <div className="container middle-panel" style={{padding: '0px', paddingTop: '20px'}}>
            <div id="stats-card-row-dashboard">
              <div id="dashboard-card">
                <h4> Account Balance: <b>₦{walletBalance} </b> </h4>
                <button onClick={() => history.push(`/fundWallet`)} className="btn btn-sm" id="credit_request_arrow">Fund Wallet &rarr;</button>
              </div>
            </div>
      </div>
    </div>
  );
}

export default withRouter(Wallets);