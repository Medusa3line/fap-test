import React, { Component } from 'react';
import swal from 'sweetalert';
import {TimeOut} from '../../timeOut';
import baseUrl from '../../baseUrl';

import Header from '../Header/Header';
import Balance from '../Balance/Balance';
import WithdrawalFields from './WithdrawalFields';

class withdrawal extends Component {
    constructor(){
    super()
    this.state = {
      userDetails : {},
      paymentCode: '',
      customerName: '',
      amount: '',
      agentPin: '',
      isPaymentCodeValid: false,
      redirect: false,
      validating: false,
      makingWithdrawal: false,
      phoneNumber: '',
      tranRef: '',
      terminalId: ''
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
  onChangeAgentPin = async (e) => {
    await this.setState({agentPin: e.target.value})
  }
  onChangePhoneNumber = async (e) => {
    await this.setState({phoneNumber: e.target.value})
    if(this.state.isPaymentCodeValid){
      this.setState({isPaymentCodeValid: false})
    }
  }
  onChangePaymentCode = async (e) => {
    await this.setState({paymentCode: e.target.value});
    if(this.state.isPaymentCodeValid){
      this.setState({isPaymentCodeValid: false})
    }
  }

  validatePaymentCode = (e) => {
    let id = e.target.id;
    document.getElementById(id).disabled = true;

    let reqBody = {
      facCode: this.state.paymentCode,
      mobileNumber: this.state.phoneNumber
    };

    let auth_token = this.state.userDetails.auth_token;

    this.setState({validating: true})

    fetch(`${baseUrl}/transactions/gtb/validate/fac`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(validationStatus => {
        document.getElementById(id).disabled = false;
        this.setState({validating: false})
        if(validationStatus.respCode === '00'){
          this.setState({
            isPaymentCodeValid: true,
            tranRef: validationStatus.respBody.tranRef,
            customerName: validationStatus.respBody.customerName,
            amount: validationStatus.respBody.amount
          })          
        } else {
          swal("Failed Operation", `${validationStatus.respDescription}`, "error")
        }
      })
      .catch(err => {
        document.getElementById(id).disabled = false;
        this.setState({validating: false})
        swal("Failed Operation", `${err}`, "error")
      })
  }

  withdrawFund = (e) => {
    let id = e.target.id;
    document.getElementById(id).disabled = true;

    let reqBody = {
      facCode: this.state.paymentCode,
      mobileNumber: this.state.phoneNumber,
      agentPin: this.state.agentPin,
      amount: this.state.amount,
      terminalId: this.state.terminalId,
      tranRef: this.state.tranRef,
      customerName: this.state.customerName,
    };

    let auth_token = this.state.userDetails.auth_token;

    this.setState({makingWithdrawal: true})

    fetch(`${baseUrl}/transactions/gtb/cashout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(withdrawalStatus => {
        document.getElementById(id).disabled = false;
        this.setState({makingWithdrawal: false})
        if(withdrawalStatus.respCode === '00'){
          this.setState({
            paymentCode: '',
            customerName: '',
            amount: '',
            agentPin: '',
            isPaymentCodeValid: false,
            phoneNumber: '',
            tranRef: ''
          }) 
          swal("Successful Operation", " Successful Withdrawal ", "success");         
        } else {
          swal("Failed Operation", `${withdrawalStatus.respDescription}`, "error")
        }
      })
      .catch(err => {
        document.getElementById(id).disabled = false;
        this.setState({makingWithdrawal: false})
        swal("Failed Operation", `${err}`, "error")
      })
  }

  render() {
    if (this.state.redirect){
      this.props.history.push("/");   
  }
  const { paymentCode, phoneNumber, tranRef, customerName, agentPin, amount, isPaymentCodeValid, validating, makingWithdrawal } = this.state;
    return (
      <div className="body">
        {/* <!-- Main Wrapper --> */}
        <div className="container-fluid"  style={{padding: '0'}}>      
          <Header />  
          <div className="container-fluid" id="bottom-content">    
            <div id="main">   
              <div id="container">
                <div id="panel">
                  <h4> Withdrawal</h4>
                  <h6> Withdraw money from a GTB account </h6>
                </div> 
                <div className="line"></div><br/>     
                <Balance />      
                <WithdrawalFields 
                  paymentCode={paymentCode}
                  customerName={customerName}
                  amount={amount}
                  tranRef={tranRef}
                  validating={validating}
                  makingWithdrawal={makingWithdrawal}
                  agentPin={agentPin}
                  withdrawFund={this.withdrawFund}
                  isPaymentCodeValid={isPaymentCodeValid}
                  onChangePaymentCode={this.onChangePaymentCode}
                  onChangeAgentPin={this.onChangeAgentPin}
                  validatePaymentCode={this.validatePaymentCode}
                  phoneNumber={phoneNumber}
                  onChangePhoneNumber={this.onChangePhoneNumber}
                />                      
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withdrawal;