import React, { Component } from 'react';
import swal from 'sweetalert';
import baseUrl from '../../../baseUrl';

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
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
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
        // console.log(result)
        this.setState({
          tradingBalance: result.respBody.walletBalance, 
          incomeBalance: result.respBody.incomeBalance
        })
      })
      .catch(err => {
        swal('Error', 'Error getting balance', 'info')
      });
  }

    render(){
      const { tradingBalance, incomeBalance } = this.state;
        return (
          <div className="row" id="stats-top-card" style={{padding: 'unset'}}>
            <h6 className="col-lg-4 col-md-12 col-sm-4" style={{ fontSize: '12px', fontWeight: 'bold'}}>Trading Balance: ₦ {tradingBalance}</h6>
            <h6 className="col-lg-4 col-md-12 col-sm-4" style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center'}}>Income Balance: ₦ {incomeBalance}</h6>
          </div>
      );
    }
}

export default DashboardDetails;