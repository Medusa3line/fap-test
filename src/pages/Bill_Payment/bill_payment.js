import React, { Component } from 'react';

import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import Header from '../Header/Header';
import BillFields from './BillFields'

 class bill_payment extends Component {

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
                      <h4> Bill Payment </h4>
                    </div>                              
                    <BillFields />     
                </div>
              </div>
            </div>
          </div>
      </div>
    )  
  }
}
export default withTimeout(bill_payment);