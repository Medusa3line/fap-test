import React, { Component } from 'react';
import Header from '../Header/Header';
import Balance from '../../Components/Balance/Balance';
import TransferFields from './TransferFields';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

class transfer extends Component {
  render() {
    return (
      <div className="body">
          {/* <!-- Main Wrapper --> */}
          <div className="container-fluid" style={{padding: '0'}}>
            <Header />
          <div className="container-fluid" id="bottom-content">
            <div id="main">   
                <div id="container">
                    <div id="panel">
                      <h4> Wallet Transfer </h4>
                      <h6> Transfer funds to any account </h6>
                    </div>
                    <div className="line"></div><br/>
                    <Balance />    
                    <TransferFields />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withTimeout(transfer);