import React from 'react';

const Wallets = ({ goToTradingWallet, goToIncomeWallet, goToFundWallet, walletBalance, incomeBalance }) => {
    return (
      <div>
        <div className="container middle-panel" style={{padding: '0px', paddingTop: '20px'}}>
          <div className="row" id="stats-top-most-card" style={{padding: '0px'}}>
            <div className="row" style={{margin: '0px'}}>
              <div className="row" id="stats-card-row-dashboard">
                <div id="dashboard-card" onClick={goToTradingWallet}>
                  <h6> Trading Wallet</h6>
                  <h4 id="first-aggregator-count" style={{fontWeight: 'bold'}}>₦ {walletBalance} </h4> <img id="dashboard-count-image" alt="" src={require("../../img/bar_chart_4.svg")} />
                </div>
                <div id="dashboard-card" onClick={goToIncomeWallet}>
                  <h6> Income Wallet</h6> 
                  <h4 id="first-aggregator-count" style={{fontWeight: 'bold'}}>₦ {incomeBalance} </h4> <img id="dashboard-count-image" alt="" src={require("../../img/bar_chart_5.svg")} />
                </div>
                <div id="dashboard-card-side" onClick={goToFundWallet}>
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

export default Wallets;