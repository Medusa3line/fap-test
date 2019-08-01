import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import '../../assets/css/bootstrap.min.css';
import '../../assets/extras/animate.css';
import {TimeOut} from '../../timeOut';

import Header from '../Header/Header';
import BillFields from './BillFields'

 class bill_payment extends Component {
    _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false,
      route: 'dashboard',
      bank: '',
      amount: '',
      depositorsName:''
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

  render() {
    if (this.state.redirect){
    this.props.history.push("/");   
  }
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
                    <BillFields  />     
                </div>
              </div>
            </div>
          </div>
      </div>
    )  
  }
}
export default bill_payment;