import React, { Component, memo } from 'react';
import baseUrl from '../../baseUrl';
import swal from 'sweetalert';
import './balance.css';

class Balance extends Component{
  constructor(){
    super()
    this._isMounted = false;
    this.state = {
      userDetails : {},
      balance: '',
      isLoading: false
    }

  }

  componentWillUnmount(){
    this._isMounted = false;
  }
  
  componentDidMount = async () => {
    this._isMounted = true;
    this.setState({isLoading: true})
    if (this._isMounted && sessionStorage.getItem('userDetails')){
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
          this.setState({balance: result.respBody.walletBalance})
        })
        .catch(err => {
          swal('Error', 'Error getting balance', 'info')
        });
      }
    this.setState({isLoading: false})
    this._isMounted = false;
  }

  render(){
        return (
        <div id="balanceComponent">
          <div>
            <h5 style={{fontWeight: 'bold'}}>Balance</h5>
          </div>
          <div>
          {
            this.state.isLoading ? <h6>Loading...</h6> :
            <h5 style={{fontWeight: 'bold'}}>
              <sup style={{fontSize: '50%'}}>₦ </sup>
                
                {this.state.balance}
            </h5>
          }
            
          </div>
        </div>
      );    
  }
}

export default memo(Balance);