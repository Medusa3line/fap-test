import React, { Component } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import baseUrl from '../../baseUrl';

class DashboardDetails extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
        userDetails : {},
        tradingBalance: '',
        incomeBalance: ''
    }
  }

  componentDidMount = async () => {
    await localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })

    let auth_token = this.state.userDetails.auth_token;
    let reqBody = {}

    await fetch(`${baseUrl}/agents/fetchprofile`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(result => {
        this.setState({tradingBalance: result.respBody.walletBalance, incomeBalance: result.respBody.incomeBalance})
      })
      .catch(err => {
        swal('Error', 'Error getting balance', 'info')
      });
  }

    render(){
      const { tradingBalance, incomeBalance } = this.state;
        return (
          <div className="row" id="stats-top-card">
            <b className="col-lg-4 col-md-12 col-sm-12" style={{ fontSize: '14px'}}>Trading Balance: ₦ {tradingBalance}</b>
            <b className="col-lg-4 col-md-12 col-sm-12" style={{textAlign: 'center', fontSize: '14px'}}>Income Balance: ₦ {incomeBalance}</b>
            <div className="col-lg-4 col-md-12 col-sm-12" style={{textAlign: 'right'}}><Link to="/aggregatorTransfer"><button className="btn btn-sm btn-primary"> Transfer</button></Link></div>
          </div>
      );
    }
	
}

export default DashboardDetails;