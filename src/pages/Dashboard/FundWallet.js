import React, { Component } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/js/bootstrap.js';
import '../../assets/css/bootstrap.min.css';
import '../../assets/extras/animate.css';
import '../../assets/css/font-awesome.min.css';
import baseUrl from '../../baseUrl';
import {TimeOut} from '../../timeOut';

import Header from '../Header/Header';
import CreditRequest from './CreditRequest';

class FundWallet extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false,
      route: 'dashboard',
      bank: '',
      amount: '',
      depositorsName:'',
      makingPayment: false
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
      await this.setState({redirect: true})
    }

    //Get User Information
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
    

  } //End of ComponentDidMount


  creditRequest = () => { this.setState({route: 'creditRequest'}) }

  bankName = (event) => { this.setState({bank: event.target.value}) }
  amount = (event) => { this.setState({amount: event.target.value}) }
  depositorsName = (event) => { this.setState({depositorsName: event.target.value}) }
  
  creditRequestApprove = (e) => {
   e.preventDefault();
    let id = e.target.id;
    let reqBody = {
    bank: this.state.bank,
    amount: this.state.amount,
    depositorsName: this.state.depositorsName
    };
    let auth_token = this.state.userDetails.auth_token;

    if(reqBody.bank === '' || reqBody.amount === '' || reqBody.depositorsName === ''){
      swal("Failed Operation", "All fields are required", "error")
    } else {
      document.getElementById(id).disabled = true;
      this.setState({makingPayment: true})

      fetch(`${baseUrl}/wallet/creditRequest`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(creditRequestStatus => {
        document.getElementById(id).disabled = false;
        if(creditRequestStatus.respCode === '00'){
          swal("Successful Operation", "Request Successful.", "success")
          this.setState({makingPayment: false});
        } else {
          swal("Failed Operation", "An error occured, please try again.", "error");
          this.setState({makingPayment: false});
        }
      })
      .catch(err => {
        swal("Failed Operation", "An error occured while performing this operation, please try again later.", "info");
        document.getElementById(id).disabled = false;
        this.setState({makingPayment: false});
      });
    }
  }


  render() {
  if (this.state.redirect){
    this.props.history.push("/");   
  }
 
    return (
	    <div className="body">  
	        <div className="container-fluid" style={{padding: '0'}}>  
	          <Header />
	            <div className="container-fluid" id="bottom-content">
	              <div id="main">
	                <div id="container">
	                  <div id="panel">
	                    <h4 className="text-left"> <span style={{padding: '0px 2vh'}}><img src={require("../../img/credit_request.svg")} alt="" /></span> Credit Request </h4>
	                  </div><br/>
	                  <CreditRequest 
	                    creditRequestApprove={this.creditRequestApprove}
	                    bankName={this.bankName}
	                    amount={this.amount} 
	                    depositorsName={this.depositorsName}
	                    makingPayment = {this.state.makingPayment}
	                  />
	                </div>
	              </div> 
	        	</div>
	      	</div>
	    </div>

    ); 
  }
}

export default FundWallet;