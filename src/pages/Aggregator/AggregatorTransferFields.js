import React, { Component } from 'react';
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import {TimeOut} from '../../timeOut';
import MakingPayment from '../../makingPayment.js';
import { manipulateNumber } from '../../manipulateNumber';

class AggregatorTransferFields extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {},
      wtaAmount: '',
      wtaPin:'',
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

  wtaAmount = async (event) => { await this.setState({wtaAmount: event.target.value}) }
  wtaPin = async (event) => { await this.setState({wtaPin: event.target.value}) }

  componentDidMount = async () => {
    this._isMounted = true;
    await this.setState({userDetails: JSON.parse(localStorage.getItem('userDetails'))});

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

  walletToAccountTransfer = async (e) => {
    let id = e.target.id; 
    if (this.state.wtaAmount === '' || this.state.wtaPin === ''){
        swal("Invalid Operation", "Please fill all fields", "error")
    } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
        amount: this.state.wtaAmount,
        pin: this.state.wtaPin
    };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/wallet/disburseWallet/trading`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(transferStatus => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            if (transferStatus.respCode === '00'){
                swal("Succesful Operation", "Transfer was Succesful", "success")
            } else if (transferStatus.respCode === '100'){
                swal("Unsuccesful Operation", "Balance is insufficient", "error")
            } else if (transferStatus.respCode === '154'){
                swal("Unsuccesful Operation", "Pin is Incorrect", "error")
            } else {
                if (transferStatus.respDescription !== null){
                   swal("Unsuccesful Operation", transferStatus.respDescription, "error") 
                } else {
                    swal("Unsuccesful Operation", "An Error Occured, please try again later.", "error")
                }
            }
          }).catch(err => {
            this.setState({makingPayment: false})
            swal("Unsuccesful Operation", "An Error Occured, Please try again", "error");
            document.getElementById(id).disabled = false;
          })
    }
}

    render(){
      const { makingPayment } = this.state;
        return (
            <div>
                <div className="form-horizontal">
                    <div>
                        <div id="transferDetails">
                          <h6>Account Number: <span>{this.state.userDetails.accountNo}</span></h6>  
                          <h6>Transaction Fee: <span>₦52.00</span></h6>                   
                        </div>

                        <div className="form-group">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <input 
                              type="number" 
                              className="form-control" 
                              required="required" 
                              id="amount" 
                              placeholder="Amount" 
                              maxLength="8"
                              onChange={this.wtaAmount}
                              onKeyPress={(e) => manipulateNumber(e)}
                            />                        
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <input 
                              type="password" 
                              className="form-control" 
                              required="required" 
                              id="pin" 
                              placeholder="Agent PIN" 
                              onChange={this.wtaPin}
                              maxLength="4"
                              onKeyPress={(e) => manipulateNumber(e)}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">        
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <button 
                                type="submit"
                                className="btn btn-md btn-danger col-sm-8 col-md-6 col-lg-4" 
                                id="validate_button"                    
                                onClick={this.walletToAccountTransfer}>
                                {
                                  makingPayment ? <MakingPayment />
                                  : 'Transfer'
                                }
                              </button>
                          </div>
                        </div> 
                    </div>
                </div>
            </div>
          );
      }
    }

export default AggregatorTransferFields;