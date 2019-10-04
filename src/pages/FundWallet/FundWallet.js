import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import CreditRequest from './CreditRequest';
import Layout from '../../Components/Layout/Layout.component';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

class FundWallet extends Component {
  _isMounted = false;
  state = {
    userDetails : {},
    route: 'dashboard',
    bank: '',
    amount: '',
    depositorsName:'',
    makingPayment: false
  }

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
        swal("Failed Operation", `${err}`, "info");
        document.getElementById(id).disabled = false;
        this.setState({makingPayment: false});
      });
    }
  }

  render() { 
    return (
	    <Layout>
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
      </Layout>
    ); 
  }
}

export default withTimeout(withRouter(FundWallet));