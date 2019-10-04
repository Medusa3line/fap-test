import React, { Component } from 'react';
import baseUrl from '../../baseUrl';

import InternetServices from './InternetServices';
import UtilityBills from './UtilityBills';
import CableTv from './CableTv';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

class BillFields extends Component {
  state = {
    userDetails : {},
    route: 'internet_services',
    value: 2,
    serviceName: []
  }

  onRouteChange = async (route, value) => {
    await this.setState({serviceName: [], route: route, value: value}); 
    
    await fetch(`${baseUrl}/bills/category/${this.state.value}/service`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
        this.setState({ serviceName: result.respBody })
      }); 
    }

  componentDidMount = async () => {   
    await fetch(`${baseUrl}/bills/category/${this.state.value}/service`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
          this.setState({ serviceName: result.respBody })
        }
      ); //End of Get Bill Payment Details
  }

  render(){
    const { serviceName, route } = this.state;
    return (
    <div>
      <div id="bill-list">
        <li className={route === 'internet_services' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('internet_services', '2')}><span><img src={require("../../img/wifi-symbol.svg")} alt="" /></span>Internet Services</li>
        <li className={route === 'utility_bills' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('utility_bills', '3')}><span><img src={require("../../img/billpayment.svg")} alt="" /></span>Utility Bills</li>
        <li className={route === 'cable_tv' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('cable_tv', '4')}><span><img src={require("../../img/television.svg")} alt="" /></span>Cable TV</li>
      </div>
      <div style={{marginBottom: '5%'}}>
        <div className="dropdown">
            {
              route === 'internet_services' ?
                <InternetServices 
                  serviceName={serviceName}
                /> : 
                (
                  route === 'utility_bills' ? 
                    <UtilityBills 
                      serviceName={serviceName} 
                    /> : 
                  (
                    route === 'cable_tv' ?
                      <CableTv 
                        serviceName={serviceName} 
                      />  : 
                      null
                  )
                )                   
            }
          </div>           
        </div>
    </div>
  );
  }	
}

export default BillFields;