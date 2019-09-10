import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import Header from '../Header/Header';
import CreditRequest from './CreditRequest';

class FundWallet extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
      route: 'dashboard',
      bank: '',
      amount: '',
      depositorsName:'',
      makingPayment: false
    }
  }

  componentDidMount = async () => {
    //Get User Information
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })    
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
          this.props.history.push("/dashboard")
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
    return (
	    <div className="body">  
	        <div className="container-fluid" style={{padding: '0'}}>  
	          <Header />
	            <div className="container-fluid" id="bottom-content">
	              <div id="main">
	                <div id="container">
	                  <div id="panel">
	                    <h4> Credit Request </h4>
                      <h6> Request for your account to be credited. </h6>
                    </div>
                    <div className="line"></div><br/>
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

export default withTimeout(withRouter(FundWallet));