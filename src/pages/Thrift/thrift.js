import React, { Component } from 'react';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import Header from '../Header/Header';
import ThriftEnrollment from './ThriftEnrollment/thrift_enrollment';
import ThriftContribution from './ThriftContribution/thrift_contribution';
import ThriftBalance from './ThriftBalance/thrift_balance_enquiry';
import ThriftLiquidation from './ThriftLiquidation/thrift_liquidation'

class thrift extends Component { 
  constructor(){
      super()
      this.state = {
        route: 'enrollment'
      }
    }

componentDidMount = async () => {
  await sessionStorage.getItem('userDetails') && this.setState ({
    userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
  })
}

changeRoute = (route) => {
  this.setState({route: route})
}   

  render() {
  const { route } = this.state;
    return (
      <div className="body">
        {/* <!-- Main Wrapper --> */}
        <div className="container-fluid" style={{padding: '0'}}>
          <Header />
          <div className="container-fluid" id="bottom-content">
            <div id="main">   
              <div id="container">
                <div id="panel" style={{padding: '0px'}}>
                  <div id="thrift-panel">
                    <h5 className={route === 'enrollment' ? 'underline-thrift-panel': null} onClick={() => this.changeRoute('enrollment')}> Enrollment </h5>
                    <h5 className={route === 'balance' ? 'underline-thrift-panel': null} onClick={() => this.changeRoute('balance')}> Balance </h5>
                    <h5 className={route === 'contribution' ? 'underline-thrift-panel': null} onClick={() => this.changeRoute('contribution')}> Contribution </h5>
                    <h5 className={route === 'liquidation' ? 'underline-thrift-panel': null} onClick={() => this.changeRoute('liquidation')}> Liquidation </h5>
                  </div> 
                </div>       
                {
                  route === 'enrollment' ?
                  <ThriftEnrollment /> : (
                    route === 'contribution' ? 
                    <ThriftContribution /> : (
                      route === 'balance' ? 
                      <ThriftBalance /> : (
                        route === 'liquidation' ? 
                          <ThriftLiquidation /> : 
                          null
                      )
                    )
                  ) 
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }

export default withTimeout(thrift);