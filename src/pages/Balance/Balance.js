import React, { Component } from 'react';
import baseUrl from '../../baseUrl';
import swal from 'sweetalert';

class Header extends Component{
  constructor(){
    super()
    this.state = {
      userDetails : {},
      balance: ''
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
        this.setState({balance: result.respBody.walletBalance})
      })
      .catch(err => {
        swal('Error', 'Error getting balance', 'info')
      });
  }

  render(){
    return (
    <div>
      <div id="balanceComponent">
        <div>
          <h5 style={{fontWeight: 'bold'}}>Balance</h5>
        </div>
        <div>
          <h5 style={{fontWeight: 'bold'}}><sup style={{fontSize: '50%'}}>₦ </sup>{this.state.balance}</h5>
        </div>
      </div>
    </div>
    );
  }
}

export default Header;