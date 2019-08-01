import React, { Component } from 'react';
import {TimeOut} from '../../timeOut';

import Header from '../Header/Header';
import ThriftEnrollment from './ThriftEnrollment/thrift_enrollment';
import ThriftContribution from './ThriftContribution/thrift_contribution';
import ThriftBalance from './ThriftBalance/thrift_balance_enquiry';
import ThriftLiquidation from './ThriftLiquidation/thrift_liquidation'

class thrift extends Component { 
  constructor(){
      super()
      this.state = {
        redirect: false, 
        route: 'enrollment'
      }
    }

// For Setting Time Out
clearTimeoutFunc = () => { if (this.logoutTimeout) {clearTimeout(this.logoutTimeout)}; };
setTimeout = () => { this.logoutTimeout = setTimeout(this.logout, TimeOut); };
resetTimeout = () => { this.clearTimeoutFunc(); this.setTimeout(); };
logout = () => { localStorage.clear(); if(this._isMounted){ this.props.history.push("/"); alert('Your session timed out'); } };

// Cancelling subscriptions
componentWillUnmount(){
  this._isMounted = false;
}

componentDidMount = async () => {
    this._isMounted = true;
    if(!localStorage.getItem('userDetails')){
      this.setState({redirect: true})
    }
    await localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })

    // Handling timeout when there is no event
     this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) { window.addEventListener(this.events[i], this.resetTimeout); } 
    this.setTimeout(); //End of Timeout handling

  }
  changeRoute = (route) => {
    this.setState({route: route})
  }   

  render() {
    if (this.state.redirect){
    this.props.history.push("/");  
  }
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

export default thrift;