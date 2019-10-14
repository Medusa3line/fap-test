import React from 'react';
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;