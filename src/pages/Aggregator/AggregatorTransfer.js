import React, { Component } from 'react';
import AggregatorHeader from './AggregatorHeader';
import AggregatorTransferFields from './AggregatorTransferFields';
import {TimeOut} from '../../timeOut';

class AggregatorTransfer extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {}
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

  goToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    if (this.state.redirect){
      this.props.history.push("/");   
  }
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
                  <AggregatorTransferFields 
                    goToDashboard={this.goToDashboard}
                  />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default AggregatorTransfer;