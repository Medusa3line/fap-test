import React, { Component } from 'react';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import AggregatorTransferFields from './AggregatorTransferFields';
import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';

class AggregatorTransfer extends Component {

  render() {
    return (
      <div className="body">
          {/* <!-- Main Wrapper --> */}
          <div className="container-fluid" style={{padding: '0', backgroundColor: '#f3f3f3'}}>
            <AggregatorHeader />
      
            <div id="main">   
              <div id="container">
                  <div id="panel">
                    <h4> Wallet Transfer </h4>
                    <h6> Transfer funds to any account </h6>
                  </div>
                  <div className="line"></div><br/>
                  <AggregatorTransferFields />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default withTimeout(AggregatorTransfer);