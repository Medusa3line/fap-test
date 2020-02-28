import React from 'react';
import './Wallet.styles.scss'

const Wallets = ({ walletBalance }) => {
  return (
    <div>
      <div className="wallet-container">
        <div id="stats-card-row-dashboard">
          <div>
            Account Balance: <b>₦{walletBalance}</b>
          </div>            
        </div>
      </div>
    </div>
  );
}

export default Wallets;