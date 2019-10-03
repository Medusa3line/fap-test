import React from 'react';
import { Link } from 'react-router-dom';
import './Wallet.styles.scss'

const Wallets = ({ walletBalance }) => {
  return (
    <div>
      <div className="container middle-panel">
        <div id="stats-card-row-dashboard">
          <div id="dashboard-card">
            <div>
              Account Balance: <b>₦{walletBalance}</b>
            </div>
            <div>
              <Link to="/fundWallet" ><button className="btn btn-sm" id="credit_request_arrow">Fund Wallet &rarr;</button></Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;